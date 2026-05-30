import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('clerk_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ current_streak: 0, last_completed_date: null })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { challenge_title?: string; completed_date?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { challenge_title, completed_date } = body
  if (!completed_date) {
    return NextResponse.json({ error: 'completed_date is required' }, { status: 400 })
  }

  // Record the completion
  if (challenge_title) {
    const { error: compError } = await supabase
      .from('challenge_completions')
      .upsert(
        {
          clerk_id: userId,
          challenge_title,
          completed_date,
        },
        { onConflict: 'clerk_id,completed_date' }
      )
    if (compError) {
      console.error('Challenge completion error:', compError)
    }
  }

  // Get current streak
  const { data: currentStreak } = await supabase
    .from('streaks')
    .select('*')
    .eq('clerk_id', userId)
    .single()

  let newStreak = 1
  const today = completed_date
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  if (currentStreak) {
    if (currentStreak.last_completed_date === today) {
      // Already completed today
      return NextResponse.json(currentStreak)
    } else if (currentStreak.last_completed_date === yesterdayStr) {
      // Consecutive day — increment
      newStreak = (currentStreak.current_streak || 0) + 1
    } else {
      // Streak broken
      newStreak = 1
    }
  }

  const now = new Date().toISOString()
  const { data, error } = await supabase
    .from('streaks')
    .upsert(
      {
        clerk_id: userId,
        current_streak: newStreak,
        last_completed_date: today,
        updated_at: now,
      },
      { onConflict: 'clerk_id' }
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
