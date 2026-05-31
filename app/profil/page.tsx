'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import Navigation from '@/components/Navigation'
import type { Favorite } from '@/lib/types'

const avatarColors = ['#9B5DE5', '#FF6B6B', '#FFB703', '#1D9E75', '#3A86FF', '#F72585', '#FF9A3C']
const avatarEmojis = ['😊', '🦄', '🐻', '🦊', '🐸', '🦋', '🎃', '🌈', '🚀', '⭐', '🎯', '🏆']
const hobbyOptions = [
  { id: 'sport', label: 'Sport', icon: '⚽' },
  { id: 'svømning', label: 'Svømning', icon: '🏊' },
  { id: 'kunst', label: 'Kunst', icon: '🎨' },
  { id: 'musik', label: 'Musik', icon: '🎵' },
  { id: 'dans', label: 'Dans', icon: '💃' },
  { id: 'natur', label: 'Natur', icon: '🌿' },
  { id: 'læsning', label: 'Læsning', icon: '📖' },
  { id: 'madlavning', label: 'Madlavning', icon: '🍳' },
  { id: 'foto', label: 'Foto', icon: '📸' },
  { id: 'lego', label: 'LEGO', icon: '🧩' },
  { id: 'brætspil', label: 'Brætspil', icon: '🎲' },
  { id: 'yoga', label: 'Yoga', icon: '🧘' },
]

type FriendProfile = {
  clerk_id: string
  username: string
  display_name: string
  avatar_emoji: string
  avatar_color: string
  friendship_id?: string
  requester_id?: string
}

type FriendsData = {
  friends: FriendProfile[]
  received: FriendProfile[]
  sent: string[]
}

type Profile = {
  id?: string
  clerk_id?: string
  username: string
  display_name: string
  avatar_emoji: string
  avatar_color: string
  hobbies: string[]
  age_group?: string
}

export default function ProfilPage() {
  const { user } = useUser()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [friendsData, setFriendsData] = useState<FriendsData>({ friends: [], received: [], sent: [] })
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [friendSearch, setFriendSearch] = useState('')
  const [friendSearchResult, setFriendSearchResult] = useState<FriendProfile | null>(null)
  const [friendSearchError, setFriendSearchError] = useState('')
  const [searching, setSearching] = useState(false)
  const [sendingRequest, setSendingRequest] = useState(false)

  // Edit state
  const [editDisplayName, setEditDisplayName] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [editAvatarEmoji, setEditAvatarEmoji] = useState('😊')
  const [editAvatarColor, setEditAvatarColor] = useState('#9B5DE5')
  const [editHobbies, setEditHobbies] = useState<string[]>([])
  const [editAgeGroup, setEditAgeGroup] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const photoInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploadingPhoto(true)
    try {
      await user.setProfileImage({ file })
    } catch (err) {
      console.error('Foto-upload fejlede:', err)
    } finally {
      setUploadingPhoto(false)
      if (photoInputRef.current) photoInputRef.current.value = ''
    }
  }

  const loadFriends = async () => {
    const res = await fetch('/api/friends')
    const data = await res.json()
    if (data && !data.error && (data.friends || data.received || data.sent)) {
      setFriendsData({
        friends: data.friends || [],
        received: data.received || [],
        sent: data.sent || [],
      })
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [profileRes, favsRes, friendsRes, streakRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/favorites'),
          fetch('/api/friends'),
          fetch('/api/streak'),
        ])
        const profileData = await profileRes.json()
        const favsData = await favsRes.json()
        const friendsApiData = await friendsRes.json()
        const streakData = await streakRes.json()

        if (profileData && !profileData.error) {
          setProfile(profileData)
          setEditDisplayName(profileData.display_name || '')
          setEditUsername(profileData.username || '')
          setEditAvatarEmoji(profileData.avatar_emoji || '😊')
          setEditAvatarColor(profileData.avatar_color || '#9B5DE5')
          setEditHobbies(profileData.hobbies || [])
          setEditAgeGroup(profileData.age_group || '')
        } else if (user) {
          // No profile yet — prefill from Clerk
          setEditDisplayName(user.firstName || user.username || '')
          setEditUsername(user.username || '')
          setEditing(true)
        }

        if (Array.isArray(favsData)) setFavorites(favsData)

        if (friendsApiData && !friendsApiData.error) {
          setFriendsData({
            friends: friendsApiData.friends || [],
            received: friendsApiData.received || [],
            sent: friendsApiData.sent || [],
          })
        }

        if (streakData?.current_streak !== undefined) setStreak(streakData.current_streak)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: editDisplayName,
          username: editUsername,
          avatar_emoji: editAvatarEmoji,
          avatar_color: editAvatarColor,
          hobbies: editHobbies,
          age_group: editAgeGroup,
        }),
      })
      const data = await res.json()
      if (!data.error) {
        setProfile(data)
        setEditing(false)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleSearchFriend = async () => {
    if (!friendSearch.trim()) return
    setSearching(true)
    setFriendSearchError('')
    setFriendSearchResult(null)
    try {
      const res = await fetch(`/api/friends?search=${encodeURIComponent(friendSearch.trim())}`)
      const data = await res.json()
      if (data.profile) {
        setFriendSearchResult(data.profile as FriendProfile)
      } else {
        setFriendSearchError('Ingen bruger fundet med det brugernavn.')
      }
    } catch {
      setFriendSearchError('Der opstod en fejl. Prøv igen.')
    } finally {
      setSearching(false)
    }
  }

  const handleSendFriendRequest = async (addresseeId: string) => {
    setSendingRequest(true)
    try {
      const res = await fetch('/api/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', addressee_clerk_id: addresseeId }),
      })
      const data = await res.json()
      if (data.error) {
        setFriendSearchError(data.error === 'Friendship already exists' ? 'Du har allerede sendt en anmodning til denne bruger.' : data.error)
        return
      }
      setFriendSearchResult(null)
      setFriendSearch('')
      await loadFriends()
    } finally {
      setSendingRequest(false)
    }
  }

  const handleFriendAction = async (clerkId: string, action: 'accept' | 'reject') => {
    await fetch('/api/friends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, requester_id: clerkId }),
    })
    await loadFriends()
  }

  const handleRemoveFriend = async (friendId: string) => {
    await fetch('/api/friends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', friend_id: friendId }),
    })
    await loadFriends()
  }

  const handleRemoveFavorite = async (title: string) => {
    await fetch('/api/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activity_title: title }),
    })
    setFavorites((prev) => prev.filter((f) => f.activity_title !== title))
  }

  const toggleEditHobby = (id: string) => {
    setEditHobbies((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    )
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-5xl mb-4 animate-bounce2">⏳</div>
          <p className="font-bold text-gray-500" style={{ fontFamily: '"Nunito", sans-serif' }}>
            Indlæser profil...
          </p>
        </main>
      </>
    )
  }

  const displayProfile = profile || {
    display_name: editDisplayName || user?.firstName || 'Bruger',
    username: editUsername || user?.username || '',
    avatar_emoji: editAvatarEmoji,
    avatar_color: editAvatarColor,
    hobbies: editHobbies,
    age_group: editAgeGroup,
  }

  const totalFriendCount = friendsData.friends.length

  return (
    <>
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
          >
            👤 Min Profil
          </h1>
        </div>

        {editing ? (
          /* Edit form */
          <div
            className="bg-white rounded-3xl p-6 mb-6"
            style={{
              boxShadow: '0 4px 0 #e0c0ff, 0 8px 30px rgba(155,93,229,0.12)',
              border: '3px solid #e8d5ff',
            }}
          >
            <h2
              className="text-lg font-extrabold mb-4"
              style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
            >
              Rediger profil
            </h2>

            {/* Avatar preview + foto upload */}
            <div className="flex flex-col items-center mb-4 gap-2">
              <div className="relative">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="Profilbillede"
                    className="w-20 h-20 rounded-full object-cover"
                    style={{ border: '3px solid #9B5DE5' }}
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                    style={{ backgroundColor: editAvatarColor }}
                  >
                    {editAvatarEmoji}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all hover:scale-110"
                  style={{ backgroundColor: '#9B5DE5', border: '2px solid #fff', color: '#fff' }}
                  title="Upload foto"
                >
                  {uploadingPhoto ? '⏳' : '📷'}
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>
              <p className="text-xs text-gray-400 font-semibold" style={{ fontFamily: '"Nunito", sans-serif' }}>
                {user?.imageUrl ? 'Klik 📷 for at skifte foto' : 'Klik 📷 for at uploade et foto'}
              </p>
            </div>

            {/* Emoji picker */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-500 mb-2 block" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Vælg avatar emoji
              </label>
              <div className="flex flex-wrap gap-2">
                {avatarEmojis.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEditAvatarEmoji(e)}
                    className="text-2xl p-1 rounded-lg border-2 transition-all hover:scale-110"
                    style={{
                      borderColor: editAvatarEmoji === e ? '#9B5DE5' : 'transparent',
                      backgroundColor: editAvatarEmoji === e ? '#f3e8ff' : 'transparent',
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-500 mb-2 block" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Vælg baggrundsfarve
              </label>
              <div className="flex gap-2">
                {avatarColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setEditAvatarColor(c)}
                    className="w-8 h-8 rounded-full border-4 transition-all hover:scale-110"
                    style={{
                      backgroundColor: c,
                      borderColor: editAvatarColor === c ? '#333' : 'transparent',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Visningsnavn
                </label>
                <input
                  type="text"
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 text-sm font-semibold outline-none"
                  style={{ fontFamily: '"Nunito", sans-serif', borderColor: '#e0e0e0' }}
                  placeholder="Dit navn"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Brugernavn
                </label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                  className="w-full px-3 py-2 rounded-xl border-2 text-sm font-semibold outline-none"
                  style={{ fontFamily: '"Nunito", sans-serif', borderColor: '#e0e0e0' }}
                  placeholder="brugernavn"
                />
              </div>
            </div>

            {/* Age group */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-500 mb-2 block" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Aldersgruppe
              </label>
              <div className="flex flex-wrap gap-2">
                {['3-5', '6-8', '9-11', '12-14', '15-17', '18+'].map((ag) => (
                  <button
                    key={ag}
                    onClick={() => setEditAgeGroup(editAgeGroup === ag ? '' : ag)}
                    className="px-3 py-1 rounded-full border-2 text-xs font-bold transition-all"
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      borderColor: editAgeGroup === ag ? '#9B5DE5' : '#e0e0e0',
                      backgroundColor: editAgeGroup === ag ? '#f3e8ff' : 'white',
                      color: editAgeGroup === ag ? '#9B5DE5' : '#555',
                    }}
                  >
                    {ag} år
                  </button>
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div className="mb-6">
              <label className="text-xs font-bold text-gray-500 mb-2 block" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Interesser
              </label>
              <div className="flex flex-wrap gap-2">
                {hobbyOptions.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => toggleEditHobby(h.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full border-2 text-xs font-bold transition-all"
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      borderColor: editHobbies.includes(h.id) ? '#9B5DE5' : '#e0e0e0',
                      backgroundColor: editHobbies.includes(h.id) ? '#9B5DE5' : 'white',
                      color: editHobbies.includes(h.id) ? 'white' : '#555',
                    }}
                  >
                    {h.icon} {h.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {profile && (
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 py-2.5 rounded-2xl font-bold text-sm border-2 transition-all hover:opacity-80"
                  style={{ fontFamily: '"Baloo 2", cursive', borderColor: '#9B5DE5', color: '#9B5DE5' }}
                >
                  Annuller
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saving || !editDisplayName || !editUsername}
                className="flex-[2] py-2.5 rounded-2xl font-extrabold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ fontFamily: '"Baloo 2", cursive', background: '#9B5DE5' }}
              >
                {saving ? '⏳ Gemmer...' : '💾 Gem profil'}
              </button>
            </div>
          </div>
        ) : (
          /* Profile view */
          <div
            className="bg-white rounded-3xl p-6 mb-6"
            style={{
              boxShadow: '0 4px 0 #e0c0ff, 0 8px 30px rgba(155,93,229,0.12)',
              border: '3px solid #e8d5ff',
            }}
          >
            {/* Avatar + name */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative mb-3">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="Profilbillede"
                    className="w-20 h-20 rounded-full object-cover"
                    style={{ border: '3px solid #9B5DE5' }}
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                    style={{ backgroundColor: displayProfile.avatar_color || '#9B5DE5' }}
                  >
                    {displayProfile.avatar_emoji || '😊'}
                  </div>
                )}
              </div>
              <h2
                className="text-xl font-extrabold"
                style={{ fontFamily: '"Baloo 2", cursive', color: '#333' }}
              >
                {displayProfile.display_name}
              </h2>
              {displayProfile.username && (
                <p className="text-sm font-semibold text-gray-400" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  @{displayProfile.username}
                </p>
              )}
              {displayProfile.age_group && (
                <span
                  className="mt-1 text-xs font-bold px-3 py-0.5 rounded-full"
                  style={{ background: '#f3e8ff', color: '#9B5DE5', fontFamily: '"Nunito", sans-serif' }}
                >
                  {displayProfile.age_group} år
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Favoritter', value: favorites.length, emoji: '❤️', color: '#FF6B6B' },
                { label: 'Venner', value: totalFriendCount, emoji: '👫', color: '#3A86FF' },
                { label: 'Streak', value: streak, emoji: '🔥', color: '#FFB703' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-2xl"
                  style={{ background: `${stat.color}15`, border: `2px solid ${stat.color}30` }}
                >
                  <div className="text-2xl">{stat.emoji}</div>
                  <div
                    className="text-xl font-extrabold"
                    style={{ fontFamily: '"Baloo 2", cursive', color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs font-bold text-gray-500"
                    style={{ fontFamily: '"Nunito", sans-serif' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Hobbies */}
            {displayProfile.hobbies && displayProfile.hobbies.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-bold text-gray-400 mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Interesser
                </p>
                <div className="flex flex-wrap gap-2">
                  {displayProfile.hobbies.map((h) => {
                    const hobby = hobbyOptions.find((ho) => ho.id === h)
                    return (
                      <span
                        key={h}
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: '#f3e8ff', color: '#9B5DE5', fontFamily: '"Nunito", sans-serif' }}
                      >
                        {hobby?.icon} {hobby?.label || h}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            <button
              onClick={() => setEditing(true)}
              className="w-full py-2.5 rounded-2xl font-bold text-sm border-2 transition-all hover:opacity-80"
              style={{ fontFamily: '"Baloo 2", cursive', borderColor: '#9B5DE5', color: '#9B5DE5' }}
            >
              ✏️ Rediger profil
            </button>
          </div>
        )}

        {/* Favorites */}
        <div
          className="bg-white rounded-3xl p-5 mb-5"
          style={{ boxShadow: '0 4px 0 rgba(255,107,107,0.15)', border: '3px solid #ffe0e0' }}
        >
          <h3
            className="font-extrabold text-base mb-4"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#FF6B6B' }}
          >
            ❤️ Mine favoritter ({favorites.length})
          </h3>
          {favorites.length === 0 ? (
            <p className="text-sm text-gray-400 font-semibold text-center py-4" style={{ fontFamily: '"Nunito", sans-serif' }}>
              Du har ingen favoritter endnu.<br />Brug guiden eller søgesiden til at tilføje!
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl"
                  style={{ background: '#fff5f5' }}
                >
                  <span className="text-xl">{fav.activity_icon}</span>
                  <span
                    className="flex-1 font-semibold text-sm text-gray-700"
                    style={{ fontFamily: '"Nunito", sans-serif' }}
                  >
                    {fav.activity_title}
                  </span>
                  <button
                    onClick={() => handleRemoveFavorite(fav.activity_title)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Friends */}
        <div
          className="bg-white rounded-3xl p-5"
          style={{ boxShadow: '0 4px 0 rgba(58,134,255,0.15)', border: '3px solid #dde8ff' }}
        >
          <h3
            className="font-extrabold text-base mb-4"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#3A86FF' }}
          >
            👫 Venner
          </h3>

          {/* Search friend */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={friendSearch}
                onChange={(e) => setFriendSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchFriend()}
                placeholder="Søg efter brugernavn..."
                className="flex-1 px-3 py-2 rounded-xl border-2 text-sm font-semibold outline-none"
                style={{ fontFamily: '"Nunito", sans-serif', borderColor: '#e0e0e0' }}
              />
              <button
                onClick={handleSearchFriend}
                disabled={searching || !friendSearch.trim()}
                className="px-4 py-2 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ fontFamily: '"Baloo 2", cursive', background: '#3A86FF' }}
              >
                {searching ? '⏳' : '🔍'}
              </button>
            </div>
            {friendSearchError && (
              <p className="text-xs text-red-500 font-semibold mt-1" style={{ fontFamily: '"Nunito", sans-serif' }}>
                {friendSearchError}
              </p>
            )}
            {friendSearchResult && (
              <div
                className="mt-2 flex items-center gap-3 p-3 rounded-xl"
                style={{ background: '#e8f2ff', border: '2px solid #3A86FF33' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: friendSearchResult.avatar_color || '#9B5DE5' }}
                >
                  {friendSearchResult.avatar_emoji || '😊'}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ fontFamily: '"Baloo 2", cursive' }}>
                    {friendSearchResult.display_name}
                  </div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: '"Nunito", sans-serif' }}>
                    @{friendSearchResult.username}
                  </div>
                </div>
                {friendsData.sent.includes(friendSearchResult.clerk_id) ? (
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ fontFamily: '"Nunito", sans-serif', background: '#f0f0f0', color: '#888' }}
                  >
                    Sendt ✓
                  </span>
                ) : friendsData.friends.some((f) => f.clerk_id === friendSearchResult.clerk_id) ? (
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ fontFamily: '"Nunito", sans-serif', background: '#e8f5e8', color: '#1D9E75' }}
                  >
                    Allerede ven ✓
                  </span>
                ) : (
                  <button
                    onClick={() => handleSendFriendRequest(friendSearchResult.clerk_id)}
                    disabled={sendingRequest}
                    className="text-xs font-bold px-3 py-1.5 rounded-full text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ fontFamily: '"Baloo 2", cursive', background: '#3A86FF' }}
                  >
                    {sendingRequest ? '⏳' : '➕ Tilføj ven'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Received (pending) requests */}
          {friendsData.received.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-bold text-orange-500 mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Ventende venneanmodninger ({friendsData.received.length})
              </p>
              {friendsData.received.map((f) => (
                <div
                  key={f.clerk_id}
                  className="flex items-center gap-3 p-2.5 rounded-xl mb-2"
                  style={{ background: '#fff8e0', border: '2px solid #ffe082' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: f.avatar_color || '#9B5DE5' }}
                  >
                    {f.avatar_emoji || '😊'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm" style={{ fontFamily: '"Baloo 2", cursive' }}>
                      {f.display_name || 'Ukendt bruger'}
                    </div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: '"Nunito", sans-serif' }}>
                      @{f.username || ''}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleFriendAction(f.clerk_id, 'accept')}
                      className="text-xs font-bold px-2 py-1 rounded-full text-white"
                      style={{ background: '#1D9E75' }}
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => handleFriendAction(f.clerk_id, 'reject')}
                      className="text-xs font-bold px-2 py-1 rounded-full text-white"
                      style={{ background: '#FF6B6B' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sent (pending) requests */}
          {friendsData.sent.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Sendte anmodninger ({friendsData.sent.length})
              </p>
            </div>
          )}

          {/* Accepted friends */}
          {friendsData.friends.length === 0 ? (
            <p className="text-sm text-gray-400 font-semibold text-center py-4" style={{ fontFamily: '"Nunito", sans-serif' }}>
              Du har ingen venner endnu.<br />Søg efter et brugernavn for at tilføje!
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {friendsData.friends.map((f) => (
                <div
                  key={f.clerk_id}
                  className="flex items-center gap-3 p-2.5 rounded-xl"
                  style={{ background: '#f0f7ff' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: f.avatar_color || '#9B5DE5' }}
                  >
                    {f.avatar_emoji || '😊'}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={{ fontFamily: '"Baloo 2", cursive' }}>
                      {f.display_name || 'Ukendt bruger'}
                    </div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: '"Nunito", sans-serif' }}>
                      @{f.username || ''}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFriend(f.clerk_id)}
                    className="text-xs text-gray-300 hover:text-red-400 transition-colors"
                    title="Fjern ven"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
