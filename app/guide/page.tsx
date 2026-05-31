'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import Navigation from '@/components/Navigation'
import { activities, hobbies, ageGroups, groupSizes, filterActivities } from '@/lib/activities'
import type { AgeGroup, GroupSize, Activity } from '@/lib/types'

const weatherOptions = [
  { id: 'alle', label: 'Alle', emoji: '🌍' },
  { id: 'sol', label: 'Sol', emoji: '☀️' },
  { id: 'regn', label: 'Regn', emoji: '🌧️' },
  { id: 'sne', label: 'Sne', emoji: '❄️' },
  { id: 'varmt', label: 'Varmt', emoji: '🔥' },
]

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
}: {
  activity: Activity
  isFav: boolean
  isLoading: boolean
  isSignedIn: boolean | null | undefined
  onFavorite: (a: Activity) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const diff = difficultyConfig[activity.difficulty]

  return (
    <div
      className="bg-white rounded-2xl transition-all hover:shadow-md"
      style={{
        border: expanded ? '2px solid #9B5DE5' : '2px solid #f0e8ff',
        boxShadow: expanded ? '0 4px 12px rgba(155,93,229,0.15)' : '0 2px 0 #e0c0ff',
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
            className="font-extrabold text-sm text-gray-800 mb-1"
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
            {activity.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: tag === 'aktiv' ? '#fff0e0' : tag === 'rolig' ? '#e8f5ff' : tag === 'kreativ' ? '#f3e8ff' : tag === 'udendørs' ? '#e8f5e8' : '#f5f5f5',
                  color: tag === 'aktiv' ? '#FF6B6B' : tag === 'rolig' ? '#3A86FF' : tag === 'kreativ' ? '#9B5DE5' : tag === 'udendørs' ? '#1D9E75' : '#888',
                }}
              >
                {tag}
              </span>
            ))}
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
          style={{ borderTop: '1px solid #f0e8ff' }}
        >
          <div className="pt-3 flex flex-wrap gap-2 mb-3">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{ backgroundColor: '#e8f2ff', color: '#3A86FF' }}
            >
              ⏱ {activity.time}
            </span>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: diff.bg, color: diff.text }}
            >
              {diff.label}
            </span>
          </div>

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

export default function GuidePage() {
  const { isSignedIn } = useAuth()
  const [step, setStep] = useState(1)
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null)
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
  const [groupSize, setGroupSize] = useState<GroupSize | null>(null)
  const [weather, setWeather] = useState('alle')
  const [favorites, setFavorites] = useState<string[]>([])
  const [favLoading, setFavLoading] = useState<string | null>(null)
  const [results, setResults] = useState<Activity[]>([])

  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/favorites')
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setFavorites(data.map((f: { activity_title: string }) => f.activity_title))
          }
        })
        .catch(() => {})
    }
  }, [isSignedIn])

  useEffect(() => {
    if (step === 3) {
      const filtered = filterActivities(selectedHobbies, groupSize, weather)
      setResults(filtered)
    }
  }, [step, selectedHobbies, groupSize, weather])

  const toggleHobby = (id: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    )
  }

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

  const goNext = () => {
    if (step === 1 && selectedHobbies.length === 0) return
    if (step === 2 && !groupSize) return
    setStep((s) => Math.min(s + 1, 3))
  }

  const goBack = () => setStep((s) => Math.max(s - 1, 1))
  const reset = () => {
    setStep(1)
    setSelectedAge(null)
    setSelectedHobbies([])
    setGroupSize(null)
    setWeather('alle')
  }

  const stepLabels = ['Alder & Interesser', 'Gruppestørrelse', 'Aktiviteter']

  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-2"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
          >
            🗺️ Aktivitetsguiden
          </h1>
          <p className="text-sm font-semibold text-gray-500" style={{ fontFamily: '"Nunito", sans-serif' }}>
            3 trin til din perfekte aktivitet
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {stepLabels.map((label, i) => {
            const stepNum = i + 1
            const isDone = step > stepNum
            const isActive = step === stepNum
            return (
              <div key={label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm transition-all ${
                      isDone
                        ? 'text-white'
                        : isActive
                        ? 'text-white shadow-lg scale-110'
                        : 'text-gray-400 bg-gray-200'
                    }`}
                    style={
                      isDone
                        ? { backgroundColor: '#1D9E75' }
                        : isActive
                        ? { backgroundColor: '#9B5DE5', boxShadow: '0 0 0 3px rgba(155,93,229,0.25)' }
                        : {}
                    }
                  >
                    {isDone ? '✓' : stepNum}
                  </div>
                  <span
                    className={`text-xs font-bold hidden sm:block ${
                      isActive ? 'text-purple-600' : isDone ? 'text-green-600' : 'text-gray-400'
                    }`}
                    style={{ fontFamily: '"Nunito", sans-serif' }}
                  >
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    className="w-12 h-1 rounded-full mb-4"
                    style={{ backgroundColor: step > stepNum ? '#1D9E75' : '#e0e0e0' }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Step card */}
        <div
          className="bg-white rounded-3xl p-6 md:p-8"
          style={{ boxShadow: '0 4px 0 #e0c0ff, 0 8px 30px rgba(155,93,229,0.12)', border: '3px solid #e8d5ff' }}
        >
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2
                className="text-xl font-extrabold mb-1"
                style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
              >
                Hvad er din alder?
              </h2>
              <p className="text-xs text-gray-400 font-semibold mb-4" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Valgfrit — hjælper os med bedre forslag
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                {ageGroups.map((ag) => (
                  <button
                    key={ag.id}
                    onClick={() => setSelectedAge(selectedAge === ag.id ? null : ag.id)}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all font-bold text-sm hover:scale-105 active:scale-95"
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      borderColor: selectedAge === ag.id ? '#9B5DE5' : '#e0e0e0',
                      backgroundColor: selectedAge === ag.id ? '#f3e8ff' : 'white',
                      color: selectedAge === ag.id ? '#9B5DE5' : '#555',
                    }}
                  >
                    <span className="text-xl">{ag.emoji}</span>
                    <span className="text-xs">{ag.label}</span>
                  </button>
                ))}
              </div>

              <h2
                className="text-xl font-extrabold mb-1"
                style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
              >
                Hvad kan du lide?
              </h2>
              <p className="text-xs text-gray-400 font-semibold mb-4" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Vælg 1 eller flere interesser
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {hobbies.map((h) => {
                  const selected = selectedHobbies.includes(h.id)
                  return (
                    <button
                      key={h.id}
                      onClick={() => toggleHobby(h.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-bold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{
                        fontFamily: '"Nunito", sans-serif',
                        borderColor: selected ? '#9B5DE5' : '#e0e0e0',
                        backgroundColor: selected ? '#9B5DE5' : 'white',
                        color: selected ? 'white' : '#555',
                      }}
                    >
                      <span>{h.icon}</span>
                      <span>{h.label}</span>
                    </button>
                  )
                })}
              </div>

              {selectedHobbies.length === 0 && (
                <p className="text-xs text-orange-500 font-bold mb-3" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Vælg mindst én interesse for at fortsætte
                </p>
              )}

              <button
                onClick={goNext}
                disabled={selectedHobbies.length === 0}
                className="w-full py-3 rounded-2xl font-extrabold text-base text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                style={{
                  fontFamily: '"Baloo 2", cursive',
                  background: selectedHobbies.length > 0 ? 'linear-gradient(90deg, #9B5DE5, #F72585)' : '#ccc',
                }}
              >
                Næste skridt →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2
                className="text-xl font-extrabold mb-1"
                style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
              >
                Hvor mange er I?
              </h2>
              <p className="text-xs text-gray-400 font-semibold mb-6" style={{ fontFamily: '"Nunito", sans-serif' }}>
                Vælg din gruppestørrelse
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {groupSizes.map((gs) => (
                  <button
                    key={gs.id}
                    onClick={() => setGroupSize(gs.id)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95"
                    style={{
                      borderColor: groupSize === gs.id ? '#9B5DE5' : '#e0e0e0',
                      backgroundColor: groupSize === gs.id ? '#f3e8ff' : 'white',
                    }}
                  >
                    <span className="text-3xl">{gs.emoji}</span>
                    <span
                      className="font-bold text-sm"
                      style={{
                        fontFamily: '"Nunito", sans-serif',
                        color: groupSize === gs.id ? '#9B5DE5' : '#555',
                      }}
                    >
                      {gs.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={goBack}
                  className="flex-1 py-3 rounded-2xl font-bold text-base transition-all hover:opacity-90 border-2"
                  style={{
                    fontFamily: '"Baloo 2", cursive',
                    borderColor: '#9B5DE5',
                    color: '#9B5DE5',
                    background: 'white',
                  }}
                >
                  ← Tilbage
                </button>
                <button
                  onClick={goNext}
                  disabled={!groupSize}
                  className="flex-[2] py-3 rounded-2xl font-extrabold text-base text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                  style={{
                    fontFamily: '"Baloo 2", cursive',
                    background: groupSize ? 'linear-gradient(90deg, #9B5DE5, #F72585)' : '#ccc',
                  }}
                >
                  Se aktiviteter →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h2
                    className="text-xl font-extrabold"
                    style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
                  >
                    Dine aktiviteter 🎯
                  </h2>
                  <p className="text-xs text-gray-400 font-semibold" style={{ fontFamily: '"Nunito", sans-serif' }}>
                    {results.length} forslag · Klik for detaljer
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all hover:opacity-80"
                  style={{ borderColor: '#9B5DE5', color: '#9B5DE5', fontFamily: '"Nunito", sans-serif' }}
                >
                  Start forfra
                </button>
              </div>

              {/* Weather filter */}
              <div className="flex flex-wrap gap-2 mb-5">
                {weatherOptions.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWeather(w.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full border-2 text-xs font-bold transition-all hover:scale-105"
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      borderColor: weather === w.id ? '#3A86FF' : '#e0e0e0',
                      backgroundColor: weather === w.id ? '#e8f2ff' : 'white',
                      color: weather === w.id ? '#3A86FF' : '#666',
                    }}
                  >
                    <span>{w.emoji}</span>
                    <span>{w.label}</span>
                  </button>
                ))}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">🤔</div>
                  <p className="font-bold text-gray-500" style={{ fontFamily: '"Nunito", sans-serif' }}>
                    Ingen aktiviteter matcher dine valg.<br />Prøv et andet vejrfilter!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((activity) => (
                    <ActivityCard
                      key={activity.title}
                      activity={activity}
                      isFav={favorites.includes(activity.title)}
                      isLoading={favLoading === activity.title}
                      isSignedIn={isSignedIn}
                      onFavorite={handleFavorite}
                    />
                  ))}
                </div>
              )}

              {!isSignedIn && (
                <div
                  className="mt-6 p-4 rounded-2xl text-center"
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
            </div>
          )}
        </div>
      </main>
    </>
  )
}
