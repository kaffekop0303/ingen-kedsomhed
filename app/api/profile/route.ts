import { auth, currentUser } from '@clerk/nextjs/server'
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

  // Profile exists — return it
  if (data) {
    return NextResponse.json(data)
  }

  // No profile yet — auto-create a minimal one from Clerk user data
  try {
    const clerkUser = await currentUser()
    const now = new Date().toISOString()

    // Generate a base username from Clerk data
    const baseUsername =
      clerkUser?.username ||
      (clerkUser?.firstName
        ? clerkUser.firstName.toLowerCase().replace(/\s+/g, '_')
        : null) ||
      `user_${userId.slice(-6)}`

    // Make username unique if needed
    let username = baseUsername
    let suffix = 1
    while (true) {
      const { data: existing } = await supabase
        .from('profiles')
        .select('clerk_id')
        .eq('username', username)
        .neq('clerk_id', userId)
        .maybeSingle()

      if (!existing) break
      username = `${baseUsername}_${suffix}`
      suffix++
    }

    const newProfile = {
      clerk_id: userId,
      display_name: clerkUser?.firstName || clerkUser?.username || 'Bruger',
      username,
      avatar_emoji: '😊',
      avatar_color: '#9B5DE5',
      hobbies: [],
      age_group: null,
      photo_url: null,
      created_at: now,
      updated_at: now,
    }

    const { data: created, error: createError } = await supabase
      .from('profiles')
      .upsert(newProfile, { onConflict: 'clerk_id' })
      .select()
      .single()

    if (createError) {
      // Return a 404 so the client can prompt profile setup
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json(created)
  } catch {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }
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
      .maybeSingle()

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
