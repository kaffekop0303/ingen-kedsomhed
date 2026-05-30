'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import Navigation from '@/components/Navigation'
import { dailyChallenges } from '@/lib/activities'
import Link from 'next/link'

const weekDays = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør']
const weekDaysFull = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']

function getTodayChallenge() {
  const day = new Date().getDay()
  return dailyChallenges.find((c) => c.day === day) || dailyChallenges[0]
}

function getTodayDateStr() {
  return new Date().toISOString().split('T')[0]
}

function getWeekDates(): string[] {
  const today = new Date()
  const day = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((day + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d.toISOString().split('T')[0]
  })
}

export default function DagligUdfordringPage() {
  const { isSignedIn } = useAuth()
  const todayChallenge = getTodayChallenge()
  const todayDate = getTodayDateStr()
  const weekDates = getWeekDates()

  const [streak, setStreak] = useState(0)
  const [completedDates, setCompletedDates] = useState<string[]>([])
  const [completing, setCompleting] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/streak')
      .then((r) => r.json())
      .then((data) => {
        if (data?.current_streak !== undefined) setStreak(data.current_streak)
      })
      .catch(() => {})
  }, [isSignedIn])

  useEffect(() => {
    if (!isSignedIn) return
    // Check if today is already completed
    fetch('/api/streak')
      .then((r) => r.json())
      .then((data) => {
        if (data?.last_completed_date === todayDate) {
          setCompletedDates((prev) => [...new Set([...prev, todayDate])])
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
      setCompletedDates((prev) => [...new Set([...prev, todayDate])])
      setJustCompleted(true)
    } finally {
      setCompleting(false)
    }
  }

  const todayDayIndex = new Date().getDay()
  // Reorder to Mon–Sun
  const mondayFirst = [1, 2, 3, 4, 5, 6, 0]

  return (
    <>
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
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
          className="bg-white rounded-3xl p-7 md:p-10 mb-6 text-center"
          style={{
            boxShadow: '0 8px 0 #ffe082, 0 12px 30px rgba(255,183,3,0.18)',
            border: '5px solid #FFB703',
          }}
        >
          <div className="text-6xl mb-4 animate-bounce2">{todayChallenge.emoji}</div>
          <div
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: '#FFB703', fontFamily: '"Nunito", sans-serif' }}
          >
            {weekDaysFull[new Date().getDay()]}s udfordring
          </div>
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-3"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#333' }}
          >
            {todayChallenge.title}
          </h2>
          <p
            className="text-sm font-semibold text-gray-500 mb-6 max-w-sm mx-auto"
            style={{ fontFamily: '"Nunito", sans-serif' }}
          >
            {todayChallenge.description}
          </p>

          {isSignedIn ? (
            completedDates.includes(todayDate) || justCompleted ? (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-extrabold text-white text-base"
                style={{ fontFamily: '"Baloo 2", cursive', background: '#1D9E75' }}
              >
                ✅ Gennemført i dag! Godt klaret!
              </div>
            ) : (
              <button
                onClick={handleComplete}
                disabled={completing}
                className="px-8 py-3 rounded-full font-extrabold text-base text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
                style={{
                  fontFamily: '"Baloo 2", cursive',
                  background: completing ? '#ccc' : 'linear-gradient(90deg, #1D9E75, #3A86FF)',
                  boxShadow: '0 4px 0 rgba(29,158,117,0.3)',
                }}
              >
                {completing ? '⏳ Gemmer...' : '✅ Marker som gennemført!'}
              </button>
            )
          ) : (
            <div>
              <p
                className="text-sm font-semibold text-gray-400 mb-3"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                Log ind for at tracke dine udfordringer og streak!
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

        {/* Week overview */}
        <div
          className="bg-white rounded-3xl p-5 mb-6"
          style={{
            boxShadow: '0 4px 0 #e0c0ff, 0 8px 20px rgba(155,93,229,0.1)',
            border: '3px solid #e8d5ff',
          }}
        >
          <h3
            className="font-extrabold text-base mb-4 text-center"
            style={{ fontFamily: '"Baloo 2", cursive', color: '#9B5DE5' }}
          >
            Ugens udfordringer
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {mondayFirst.map((dayIndex) => {
              const challenge = dailyChallenges.find((c) => c.day === dayIndex)
              const weekDate = weekDates[mondayFirst.indexOf(dayIndex)]
              const isToday = dayIndex === todayDayIndex
              const isDone = completedDates.includes(weekDate) || (isToday && justCompleted)
              const isPast = weekDate < todayDate
              return (
                <div
                  key={dayIndex}
                  className="flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all"
                  style={{
                    backgroundColor: isToday
                      ? '#fff8e0'
                      : isDone
                      ? '#e8f5ee'
                      : 'transparent',
                    border: isToday ? '2px solid #FFB703' : isDone ? '2px solid #1D9E75' : '2px solid transparent',
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      color: isToday ? '#FFB703' : isDone ? '#1D9E75' : '#aaa',
                    }}
                  >
                    {weekDays[dayIndex]}
                  </span>
                  <span className="text-lg">{isDone ? '✅' : isPast && !isToday ? '⭕' : challenge?.emoji || '❓'}</span>
                </div>
              )
            })}
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
            Alle 7 udfordringer
          </h3>
          <div className="flex flex-col gap-2">
            {mondayFirst.map((dayIndex) => {
              const challenge = dailyChallenges.find((c) => c.day === dayIndex)
              const isToday = dayIndex === todayDayIndex
              if (!challenge) return null
              return (
                <div
                  key={dayIndex}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    backgroundColor: isToday ? '#fff8e0' : '#fafafa',
                    border: isToday ? '2px solid #FFB703' : '2px solid transparent',
                  }}
                >
                  <span className="text-xl flex-shrink-0">{challenge.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-bold text-xs"
                      style={{
                        fontFamily: '"Baloo 2", cursive',
                        color: isToday ? '#FFB703' : '#9B5DE5',
                      }}
                    >
                      {weekDaysFull[dayIndex]}
                    </div>
                    <div
                      className="text-xs text-gray-600 font-semibold truncate"
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
