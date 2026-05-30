import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('clerk_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: {
    display_name?: string
    username?: string
    avatar_emoji?: string
    avatar_color?: string
    hobbies?: string[]
    age_group?: string
    photo_url?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { display_name, username, avatar_emoji, avatar_color, hobbies, age_group, photo_url } = body

  // Check username uniqueness (excluding current user)
  if (username) {
    const { data: existing } = await supabase
      .from('profiles')
      .select('clerk_id')
      .eq('username', username)
      .neq('clerk_id', userId)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Brugernavn er allerede i brug.' }, { status: 409 })
    }
  }

  const now = new Date().toISOString()
  const profileData = {
    clerk_id: userId,
    display_name: display_name || '',
    username: username || '',
    avatar_emoji: avatar_emoji || '😊',
    avatar_color: avatar_color || '#9B5DE5',
    hobbies: hobbies || [],
    age_group: age_group || null,
    photo_url: photo_url || null,
    updated_at: now,
  }

  // Try to upsert
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ ...profileData, created_at: now }, { onConflict: 'clerk_id' })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
