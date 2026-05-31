'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import Navigation from '@/components/Navigation'
import { dailyChallenges, getDayOfYear } from '@/lib/activities'
import Link from 'next/link'

function getTodayDateStr() {
  return new Date().toISOString().split('T')[0]
}

function getChallengeForDay(date: Date) {
  const day = getDayOfYear(date)
  return { challenge: dailyChallenges[day % dailyChallenges.length], dayNumber: day }
}

function formatDate(date: Date) {
  return date.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function DagligUdfordringPage() {
  const { isSignedIn } = useAuth()
  const today = new Date()
  const { challenge: todayChallenge, dayNumber } = getChallengeForDay(today)
  const todayDate = getTodayDateStr()

  const [streak, setStreak] = useState(0)
  const [completedDates, setCompletedDates] = useState<string[]>([])
  const [completing, setCompleting] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/streak')
      .then((r) => r.json())
      .then((data) => {
        if (data?.current_streak !== undefined) setStreak(data.current_streak)
        if (data?.last_completed_date === todayDate) {
          setCompletedDates((prev) => Array.from(new Set([...prev, todayDate])))
          setJustCompleted(true)
        }
      })
      .catch(() => {})
  }, [isSignedIn, todayDate])

  const handleComplete = async () => {
    if (!isSignedIn) return
    setCompleting(true)
    try {
      const res = await fetch('/api/streak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge_title: todayChallenge.title,
          completed_date: todayDate,
        }),
      })
      const data = await res.json()
      if (data?.current_streak !== undefined) setStreak(data.current_streak)
      setCompletedDates((prev) => Array.from(new Set([...prev, todayDate])))
      setJustCompleted(true)
    } finally {
      setCompleting(false)
    }
  }

  const handleShare = async () => {
    const shareText = `🎯 Dagens udfordring #${dayNumber} på Ingen Kedsomhed:\n\n${todayChallenge.emoji} ${todayChallenge.title}\n\n${todayChallenge.description}\n\nProves du den? 💪`
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback: ignore
    }
  }

  // Upcoming 3 days
  const upcomingDays = [1, 2, 3].map((offset) => {
    const d = new Date(today)
    d.setDate(today.getDate() + offset)
    const { challenge, dayNumber: dn } = getChallengeForDay(d)
    return { date: d, challenge, dayNumber: dn }
  })

  const isDoneToday = completedDates.includes(todayDate) || justCompleted

  return (
    <>
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-2"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#FFB703' }}
          >
            ⭐ Dagens Udfordring
          </h1>
          <p className="text-sm font-semibold text-gray-500" style={{ fontFamily: '"Nunito", sans-serif' }}>
            En ny udfordring hver dag — tør du prøve?
          </p>
        </div>

        {/* Streak badge */}
        {isSignedIn && (
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-extrabold text-white"
              style={{
                fontFamily: '"Baloo 2", cursive',
                background: streak > 0 ? 'linear-gradient(90deg, #FF6B6B, #FFB703)' : '#ccc',
                boxShadow: streak > 0 ? '0 4px 0 rgba(255,107,107,0.3)' : 'none',
              }}
            >
              🔥 {streak} dages streak
            </div>
          </div>
        )}

        {/* Today's challenge card */}
        <div
          className="rounded-3xl p-7 md:p-10 mb-6 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFB703 0%, #FF6B6B 50%, #F72585 100%)',
            boxShadow: '0 8px 0 rgba(255,183,3,0.4), 0 12px 40px rgba(255,107,107,0.25)',
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(circle at 20% 20%, white 0%, transparent 60%), radial-gradient(circle at 80% 80%, white 0%, transparent 60%)',
            }}
          />
          <div className="relative">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.25)',
                color: 'white',
                fontFamily: '"Nunito", sans-serif',
              }}
            >
              Udfordring #{dayNumber} i år
            </div>
            <div className="text-7xl mb-4">{todayChallenge.emoji}</div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-2 opacity-90"
              style={{ color: 'white', fontFamily: '"Nunito", sans-serif' }}
            >
              {formatDate(today)}
            </div>
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-3 text-white"
              style={{ fontFamily: '"Baloo 2", cursive' }}
            >
              {todayChallenge.title}
            </h2>
            <p
              className="text-sm font-semibold mb-6 max-w-sm mx-auto opacity-90 text-white"
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              {todayChallenge.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {isSignedIn ? (
                isDoneToday ? (
                  <div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-extrabold text-base"
                    style={{
                      fontFamily: '"Baloo 2", cursive',
                      background: 'rgba(255,255,255,0.95)',
                      color: '#1D9E75',
                    }}
                  >
                    ✅ Gennemført i dag! Godt klaret!
                  </div>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={completing}
                    className="px-8 py-3 rounded-full font-extrabold text-base transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
                    style={{
                      fontFamily: '"Baloo 2", cursive',
                      background: completing ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.95)',
                      color: '#FF6B6B',
                      boxShadow: '0 4px 0 rgba(0,0,0,0.1)',
                    }}
                  >
                    {completing ? '⏳ Gemmer...' : '✅ Marker som gennemført!'}
                  </button>
                )
              ) : (
                <Link
                  href="/sign-up"
                  className="inline-block font-extrabold text-sm py-2.5 px-6 rounded-full transition-all hover:opacity-90"
                  style={{
                    fontFamily: '"Baloo 2", cursive',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#FF6B6B',
                  }}
                >
                  Log ind for at tracke 🚀
                </Link>
              )}

              {/* Share button */}
              <button
                onClick={handleShare}
                className="px-5 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  fontFamily: '"Nunito", sans-serif',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.4)',
                }}
              >
                {copied ? '✅ Kopieret!' : '📤 Del udfordringen'}
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming challenges */}
        <div
          className="bg-white rounded-3xl p-5 mb-6"
          style={{
            boxShadow: '0 4px 0 #ffe082, 0 8px 20px rgba(255,183,3,0.12)',
            border: '3px solid #ffe082',
          }}
        >
          <h3
            className="font-extrabold text-base mb-4"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#FFB703' }}
          >
            📅 Kommer snart
          </h3>
          <div className="flex flex-col gap-2">
            {upcomingDays.map(({ date, challenge, dayNumber: dn }) => (
              <div
                key={dn}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: '#fffbef', border: '2px solid #ffedb3' }}
              >
                <span className="text-2xl flex-shrink-0">{challenge.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-bold text-xs mb-0.5"
                    style={{ fontFamily: '"Nunito", sans-serif', color: '#FFB703' }}
                  >
                    {formatDate(date)} · Udfordring #{dn}
                  </div>
                  <div
                    className="text-xs font-semibold text-gray-600 truncate"
                    style={{ fontFamily: '"Nunito", sans-serif' }}
                  >
                    {challenge.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All challenges list */}
        <div
          className="bg-white rounded-3xl p-5"
          style={{
            boxShadow: '0 4px 0 rgba(0,0,0,0.06)',
            border: '3px solid #f0f0f0',
          }}
        >
          <h3
            className="font-extrabold text-base mb-4"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#555' }}
          >
            Alle {dailyChallenges.length} udfordringer
          </h3>
          <div className="flex flex-col gap-2">
            {dailyChallenges.map((challenge, index) => {
              const isToday = index === getDayOfYear(today) % dailyChallenges.length
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    backgroundColor: isToday ? '#fff8e0' : '#fafafa',
                    border: isToday ? '2px solid #FFB703' : '2px solid transparent',
                  }}
                >
                  <span className="text-xl flex-shrink-0">{challenge.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-semibold text-gray-600 truncate"
                      style={{ fontFamily: '"Nunito", sans-serif' }}
                    >
                      {challenge.title}
                    </div>
                  </div>
                  {isToday && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: '#FFB703', color: 'white', fontFamily: '"Nunito", sans-serif' }}
                    >
                      I dag
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
