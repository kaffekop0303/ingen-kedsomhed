'use client'

import { useState, useMemo } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { activities } from '@/lib/activities'
import type { Activity } from '@/lib/types'
import { useEffect } from 'react'

const filterButtons = [
  { id: 'alle', label: 'Alle', emoji: '🌍' },
  { id: 'solo', label: 'Alene', emoji: '🧍' },
  { id: 'gruppe', label: 'Gruppe', emoji: '👫' },
  { id: 'udendørs', label: 'Udendørs', emoji: '🌿' },
  { id: 'indendørs', label: 'Indendørs', emoji: '🏠' },
  { id: 'kreativ', label: 'Kreativ', emoji: '🎨' },
  { id: 'aktiv', label: 'Aktiv', emoji: '🏃' },
  { id: 'rolig', label: 'Rolig', emoji: '😌' },
]

const tagColors: Record<string, { bg: string; text: string }> = {
  aktiv: { bg: '#fff0e0', text: '#FF6B6B' },
  rolig: { bg: '#e8f2ff', text: '#3A86FF' },
  kreativ: { bg: '#f3e8ff', text: '#9B5DE5' },
  udendørs: { bg: '#e8f5e8', text: '#1D9E75' },
  indendørs: { bg: '#fff5e8', text: '#FFB703' },
  solo: { bg: '#fce4ec', text: '#F72585' },
  gruppe: { bg: '#e0f7fa', text: '#1D9E75' },
}

const difficultyConfig = {
  let: { bg: '#e8f5e8', text: '#1D9E75', label: 'Let' },
  mellem: { bg: '#fff3e0', text: '#FF9A3C', label: 'Mellem' },
  svær: { bg: '#fce8e8', text: '#FF6B6B', label: 'Svær' },
}

function ActivityCard({
  activity,
  isFav,
  isLoading,
  isSignedIn,
  onFavorite,
  onTagClick,
}: {
  activity: Activity
  isFav: boolean
  isLoading: boolean
  isSignedIn: boolean | null | undefined
  onFavorite: (a: Activity) => void
  onTagClick: (tag: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const diff = difficultyConfig[activity.difficulty]

  return (
    <div
      className="bg-white rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5"
      style={{
        border: expanded ? '2px solid #9B5DE5' : '2px solid #f0f0f0',
        boxShadow: expanded ? '0 4px 12px rgba(155,93,229,0.15)' : '0 2px 0 rgba(0,0,0,0.04)',
      }}
    >
      {/* Main row */}
      <div
        className="p-4 flex gap-3 cursor-pointer"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="text-3xl flex-shrink-0">{activity.icon}</div>
        <div className="flex-1 min-w-0">
          <div
            className="font-extrabold text-sm text-gray-800 mb-0.5"
            style={{ fontFamily: '"Baloo 2", cursive' }}
          >
            {activity.title}
          </div>
          <div
            className="text-xs text-gray-500 font-semibold mb-2"
            style={{ fontFamily: '"Nunito", sans-serif' }}
          >
            {activity.description}
          </div>
          <div className="flex flex-wrap gap-1">
            {activity.tags.map((tag) => {
              const colors = tagColors[tag] || { bg: '#f5f5f5', text: '#888' }
              return (
                <span
                  key={tag}
                  className="text-xs font-bold px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                  onClick={(e) => { e.stopPropagation(); onTagClick(tag) }}
                >
                  {tag}
                </span>
              )
            })}
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#f5f5f5', color: '#9B5DE5' }}
            >
              {activity.hobby}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {isSignedIn && (
            <button
              onClick={(e) => { e.stopPropagation(); onFavorite(activity) }}
              disabled={isLoading}
              className="text-xl transition-all hover:scale-125 active:scale-90 disabled:opacity-50"
              title={isFav ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}
            >
              {isLoading ? '⏳' : isFav ? '❤️' : '🤍'}
            </button>
          )}
          <span
            className="text-base leading-none transition-transform duration-200"
            style={{
              display: 'inline-block',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              color: '#9B5DE5',
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div
          className="px-4 pb-4"
          style={{ borderTop: '1px solid #f0f0f0' }}
        >
          <div className="pt-3 flex flex-wrap gap-2 mb-3">
            {/* Time badge */}
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{ backgroundColor: '#e8f2ff', color: '#3A86FF' }}
            >
              ⏱ {activity.time}
            </span>
            {/* Difficulty badge */}
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: diff.bg, color: diff.text }}
            >
              {diff.label}
            </span>
          </div>

          {/* Needs */}
          <div className="mb-3">
            <div
              className="text-xs font-bold text-gray-500 mb-1 flex items-center gap-1"
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              📦 Du skal bruge
            </div>
            <div className="flex flex-wrap gap-1">
              {activity.needs.map((need) => (
                <span
                  key={need}
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#f5f5f5', color: '#555' }}
                >
                  {need}
                </span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div
            className="rounded-xl p-2.5 flex gap-2 items-start"
            style={{ backgroundColor: '#fffbef', border: '1px solid #ffedb3' }}
          >
            <span className="text-base flex-shrink-0">💡</span>
            <p
              className="text-xs font-semibold text-gray-600"
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              {activity.tips}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SoegPage() {
  const { isSignedIn } = useAuth()
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('alle')
  const [favorites, setFavorites] = useState<string[]>([])
  const [favLoading, setFavLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/favorites')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data.map((f: { activity_title: string }) => f.activity_title))
        }
      })
      .catch(() => {})
  }, [isSignedIn])

  const filtered = useMemo(() => {
    let list = activities

    if (activeFilter !== 'alle') {
      list = list.filter((a) => a.tags.includes(activeFilter))
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.hobby.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return list
  }, [query, activeFilter])

  const handleFavorite = async (activity: Activity) => {
    if (!isSignedIn) return
    setFavLoading(activity.title)
    const isFav = favorites.includes(activity.title)
    try {
      if (isFav) {
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activity_title: activity.title }),
        })
        setFavorites((prev) => prev.filter((t) => t !== activity.title))
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            activity_title: activity.title,
            activity_icon: activity.icon,
          }),
        })
        setFavorites((prev) => [...prev, activity.title])
      }
    } finally {
      setFavLoading(null)
    }
  }

  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-2"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#3A86FF' }}
          >
            🔍 Søg Aktiviteter
          </h1>
          <p className="text-sm font-semibold text-gray-500" style={{ fontFamily: '"Nunito", sans-serif' }}>
            {activities.length} aktiviteter klar til dig · Klik på en aktivitet for detaljer
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søg efter aktiviteter, hobbyer, tags..."
            className="w-full px-5 py-3 pr-12 rounded-2xl border-2 font-semibold text-sm outline-none transition-all"
            style={{
              fontFamily: '"Nunito", sans-serif',
              borderColor: query ? '#9B5DE5' : '#e0e0e0',
              boxShadow: query ? '0 0 0 3px rgba(155,93,229,0.12)' : 'none',
            }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            ) : (
              '🔍'
            )}
          </span>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterButtons.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-bold text-xs transition-all hover:scale-105 active:scale-95"
              style={{
                fontFamily: '"Nunito", sans-serif',
                borderColor: activeFilter === f.id ? '#9B5DE5' : '#e0e0e0',
                backgroundColor: activeFilter === f.id ? '#9B5DE5' : 'white',
                color: activeFilter === f.id ? 'white' : '#555',
              }}
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p
            className="text-xs font-bold text-gray-400"
            style={{ fontFamily: '"Nunito", sans-serif' }}
          >
            {filtered.length === 0
              ? 'Ingen resultater'
              : `${filtered.length} aktivitet${filtered.length !== 1 ? 'er' : ''}`}
          </p>
          {(query || activeFilter !== 'alle') && (
            <button
              onClick={() => { setQuery(''); setActiveFilter('alle') }}
              className="text-xs font-bold transition-all hover:opacity-70"
              style={{ color: '#9B5DE5', fontFamily: '"Nunito", sans-serif' }}
            >
              Ryd filtre ✕
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl" style={{ border: '3px solid #f0f0f0' }}>
            <div className="text-5xl mb-3">🤔</div>
            <p className="font-bold text-gray-400" style={{ fontFamily: '"Nunito", sans-serif' }}>
              Ingen aktiviteter matcher din søgning.<br />Prøv noget andet!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((activity) => (
              <ActivityCard
                key={activity.title}
                activity={activity}
                isFav={favorites.includes(activity.title)}
                isLoading={favLoading === activity.title}
                isSignedIn={isSignedIn}
                onFavorite={handleFavorite}
                onTagClick={setActiveFilter}
              />
            ))}
          </div>
        )}

        {!isSignedIn && (
          <div
            className="mt-8 p-4 rounded-2xl text-center"
            style={{ background: '#f3e8ff', border: '2px solid #d0a0ff' }}
          >
            <p className="text-sm font-bold text-purple-700 mb-2" style={{ fontFamily: '"Nunito", sans-serif' }}>
              💜 Log ind for at gemme dine favoritter!
            </p>
            <Link
              href="/sign-up"
              className="inline-block text-white font-extrabold text-sm py-2 px-5 rounded-full transition-all hover:opacity-90"
              style={{ fontFamily: '"Baloo 2", cursive', background: '#9B5DE5' }}
            >
              Opret gratis konto
            </Link>
          </div>
        )}
      </main>
    </>
  )
}
