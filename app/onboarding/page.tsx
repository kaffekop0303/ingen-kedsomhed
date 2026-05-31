'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const avatarEmojis = ['🦊', '🐸', '🦄', '🐻', '🦋', '🐼', '🐬', '🦁', '🐙', '🌟', '🎉', '🚀']
const avatarColors = ['#9B5DE5', '#FF6B6B', '#FFB703', '#1D9E75', '#3A86FF', '#F72585', '#FF9A3C']

const hobbyOptions = [
  { id: 'sport', label: 'Sport', icon: '⚽' },
  { id: 'kunst', label: 'Kunst', icon: '🎨' },
  { id: 'musik', label: 'Musik', icon: '🎵' },
  { id: 'dans', label: 'Dans', icon: '💃' },
  { id: 'natur', label: 'Natur', icon: '🌿' },
  { id: 'madlavning', label: 'Madlavning', icon: '🍳' },
  { id: 'læsning', label: 'Læsning', icon: '📖' },
  { id: 'foto', label: 'Foto', icon: '📸' },
  { id: 'lego', label: 'LEGO', icon: '🧩' },
  { id: 'brætspil', label: 'Brætspil', icon: '🎲' },
  { id: 'yoga', label: 'Yoga', icon: '🧘' },
  { id: 'svømning', label: 'Svømning', icon: '🏊' },
]

const ageGroups = ['3-5', '6-8', '9-11', '12-14', '15-17', '18+']

export default function OnboardingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [selectedAge, setSelectedAge] = useState('')
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
  const [selectedEmoji, setSelectedEmoji] = useState('🦊')
  const [selectedColor, setSelectedColor] = useState('#9B5DE5')
  const [saving, setSaving] = useState(false)
  const [usernameError, setUsernameError] = useState('')

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
    if (user) {
      setDisplayName(user.firstName || user.username || '')
      setUsername(user.username || '')
    }
  }, [isLoaded, user, router])

  const handleFinish = async () => {
    if (!username.trim()) {
      setUsernameError('Vælg et brugernavn for at fortsætte')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: displayName || user?.firstName || 'Eventyreren',
          username: username.toLowerCase().replace(/\s/g, '_'),
          avatar_emoji: selectedEmoji,
          avatar_color: selectedColor,
          hobbies: selectedHobbies,
          age_group: selectedAge,
        }),
      })
      const data = await res.json()
      if (data.error === 'Username already taken') {
        setUsernameError('Det brugernavn er desværre taget — prøv et andet')
        setSaving(false)
        return
      }
      router.push('/guide')
    } catch {
      setSaving(false)
    }
  }

  if (!isLoaded) return null

  const progressWidth = step === 1 ? '33%' : step === 2 ? '66%' : '100%'

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        background: 'repeating-linear-gradient(135deg,#FFE5E5 0,#FFE5E5 40px,#FFEFD5 40px,#FFEFD5 80px,#FFFBD5 80px,#FFFBD5 120px,#E5FFE5 120px,#E5FFE5 160px,#E5F5FF 160px,#E5F5FF 200px,#EEE5FF 200px,#EEE5FF 240px)',
      }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🎉</div>
          <h1
            className="text-2xl font-extrabold"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
          >
            Velkommen til Ingen Kedsomhed!
          </h1>
          <p className="text-sm font-semibold text-gray-500 mt-1" style={{ fontFamily: '"Nunito", sans-serif' }}>
            Lad os sætte din profil op — det tager 1 minut 🙂
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full mb-6 overflow-hidden" style={{ backgroundColor: '#f0e8ff' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: progressWidth, backgroundColor: '#9B5DE5' }}
          />
        </div>

        {/* Steps */}
        <div
          className="bg-white rounded-3xl p-6"
          style={{
            boxShadow: '0 8px 0 #e0c0ff, 0 12px 30px rgba(155,93,229,0.15)',
            border: '3px solid #e8d5ff',
          }}
        >
          {/* Step 1: Name + Avatar */}
          {step === 1 && (
            <div>
              <h2
                className="text-lg font-extrabold mb-4"
                style={{ fontFamily: '"Baloo 2", cursive', color: '#333' }}
              >
                Trin 1 — Hvem er du? 👋
              </h2>

              {/* Avatar preview */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ backgroundColor: selectedColor, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                >
                  {selectedEmoji}
                </div>
              </div>

              {/* Emoji */}
              <p className="text-xs font-bold text-gray-400 mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>Vælg din emoji</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {avatarEmojis.map((e) => (
                  <button
                    key={e}
                    onClick={() => setSelectedEmoji(e)}
                    className="text-xl w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      border: selectedEmoji === e ? '3px solid #9B5DE5' : '2px solid #e0e0e0',
                      background: selectedEmoji === e ? '#f3e8ff' : '#fff',
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>

              {/* Color */}
              <p className="text-xs font-bold text-gray-400 mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>Vælg baggrundsfarve</p>
              <div className="flex gap-2 mb-5">
                {avatarColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className="w-8 h-8 rounded-full transition-all hover:scale-110"
                    style={{
                      backgroundColor: c,
                      border: selectedColor === c ? '3px solid #333' : '2px solid transparent',
                      boxShadow: selectedColor === c ? '0 0 0 2px #fff, 0 0 0 4px #333' : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Name */}
              <div className="mb-3">
                <label className="text-xs font-bold text-gray-500 mb-1 block" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Hvad hedder du?
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 text-sm font-semibold outline-none focus:border-purple-400"
                  style={{ fontFamily: '"Nunito", sans-serif', borderColor: '#e0e0e0' }}
                  placeholder="Dit navn"
                  maxLength={20}
                />
              </div>

              {/* Username */}
              <div className="mb-5">
                <label className="text-xs font-bold text-gray-500 mb-1 block" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Vælg et brugernavn
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))
                    setUsernameError('')
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border-2 text-sm font-semibold outline-none focus:border-purple-400"
                  style={{ fontFamily: '"Nunito", sans-serif', borderColor: usernameError ? '#FF6B6B' : '#e0e0e0' }}
                  placeholder="fx seje_august123"
                  maxLength={20}
                />
                {usernameError && (
                  <p className="text-xs font-bold mt-1" style={{ color: '#FF6B6B', fontFamily: '"Nunito", sans-serif' }}>
                    {usernameError}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1 font-semibold" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Kun bogstaver, tal og _ — venner kan finde dig med dette
                </p>
              </div>

              <button
                onClick={() => {
                  if (!username.trim()) { setUsernameError('Vælg et brugernavn for at fortsætte'); return }
                  setStep(2)
                }}
                className="w-full py-3 rounded-2xl font-extrabold text-white text-base transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: '"Baloo 2", cursive',
                  background: 'linear-gradient(90deg, #9B5DE5, #3A86FF)',
                }}
              >
                Videre ➜
              </button>
            </div>
          )}

          {/* Step 2: Age + Hobbies */}
          {step === 2 && (
            <div>
              <h2
                className="text-lg font-extrabold mb-4"
                style={{ fontFamily: '"Baloo 2", cursive', color: '#333' }}
              >
                Trin 2 — Hvad kan du lide? 🎯
              </h2>

              {/* Age */}
              <p className="text-xs font-bold text-gray-500 mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>Hvor gammel er du?</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {ageGroups.map((ag) => (
                  <button
                    key={ag}
                    onClick={() => setSelectedAge(selectedAge === ag ? '' : ag)}
                    className="px-4 py-1.5 rounded-full border-2 text-sm font-bold transition-all hover:scale-105"
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      borderColor: selectedAge === ag ? '#9B5DE5' : '#e0e0e0',
                      background: selectedAge === ag ? '#9B5DE5' : '#fff',
                      color: selectedAge === ag ? '#fff' : '#666',
                    }}
                  >
                    {ag} år
                  </button>
                ))}
              </div>

              {/* Hobbies */}
              <p className="text-xs font-bold text-gray-500 mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Hvad er dine interesser? (vælg gerne flere)
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {hobbyOptions.map((h) => {
                  const sel = selectedHobbies.includes(h.id)
                  return (
                    <button
                      key={h.id}
                      onClick={() =>
                        setSelectedHobbies((prev) =>
                          prev.includes(h.id) ? prev.filter((x) => x !== h.id) : [...prev, h.id]
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-sm font-bold transition-all hover:scale-105"
                      style={{
                        fontFamily: '"Nunito", sans-serif',
                        borderColor: sel ? '#9B5DE5' : '#e0e0e0',
                        background: sel ? '#9B5DE5' : '#fff',
                        color: sel ? '#fff' : '#666',
                      }}
                    >
                      <span>{h.icon}</span> {h.label}
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-2xl font-extrabold text-sm transition-all hover:opacity-80"
                  style={{
                    fontFamily: '"Baloo 2", cursive',
                    background: '#f5f5f5',
                    color: '#999',
                  }}
                >
                  ← Tilbage
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-2 py-3 px-6 rounded-2xl font-extrabold text-white text-base transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: '"Baloo 2", cursive',
                    background: 'linear-gradient(90deg, #9B5DE5, #3A86FF)',
                    flex: 2,
                  }}
                >
                  Videre ➜
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Done */}
          {step === 3 && (
            <div className="text-center">
              <div className="text-6xl mb-4" style={{ animation: 'bounce 1s ease-in-out infinite alternate' }}>
                🎊
              </div>
              <h2
                className="text-2xl font-extrabold mb-2"
                style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
              >
                Du er klar, {displayName || 'Eventyreren'}!
              </h2>
              <p className="text-sm font-semibold text-gray-500 mb-6" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Din profil er sat op. Nu finder vi dine første aktiviteter! 🚀
              </p>

              {/* Summary */}
              <div
                className="rounded-2xl p-4 mb-6 text-left"
                style={{ background: '#f8f4ff', border: '2px solid #e8d5ff' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: selectedColor }}
                  >
                    {selectedEmoji}
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-800" style={{ fontFamily: '"Baloo 2", cursive' }}>
                      {displayName}
                    </div>
                    <div className="text-xs text-gray-500 font-semibold" style={{ fontFamily: '"Nunito", sans-serif' }}>
                      @{username}
                      {selectedAge && ` · ${selectedAge} år`}
                    </div>
                  </div>
                </div>
                {selectedHobbies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedHobbies.map((h) => {
                      const ho = hobbyOptions.find((x) => x.id === h)
                      return (
                        <span
                          key={h}
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: '#9B5DE5', color: '#fff', fontFamily: '"Nunito", sans-serif' }}
                        >
                          {ho?.icon} {ho?.label}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-2xl font-extrabold text-sm transition-all hover:opacity-80"
                  style={{ fontFamily: '"Baloo 2", cursive', background: '#f5f5f5', color: '#999' }}
                >
                  ← Tilbage
                </button>
                <button
                  onClick={handleFinish}
                  disabled={saving}
                  className="flex-2 py-3 px-6 rounded-2xl font-extrabold text-white text-base transition-all hover:opacity-90 hover:scale-105 active:scale-95 disabled:opacity-60"
                  style={{
                    fontFamily: '"Baloo 2", cursive',
                    background: 'linear-gradient(90deg, #FF6B6B, #FFB703, #1D9E75, #3A86FF, #9B5DE5)',
                    flex: 2,
                  }}
                >
                  {saving ? '⏳ Gemmer...' : '🚀 Kom i gang!'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Skip */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/guide')}
            className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
            style={{ fontFamily: '"Nunito", sans-serif' }}
          >
            Spring over og gå direkte til siden →
          </button>
        </div>
      </div>
    </main>
  )
}
