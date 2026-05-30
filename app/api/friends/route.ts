import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')

  // If searching for a user by username
  if (search) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', search.toLowerCase())
      .neq('clerk_id', userId)
      .single()

    if (error || !data) {
      return NextResponse.json({ profile: null })
    }
    return NextResponse.json({ profile: data })
  }

  // Get all friendships involving this user
  const { data: friendships, error } = await supabase
    .from('friendships')
    .select('*')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!friendships || friendships.length === 0) {
    return NextResponse.json([])
  }

  // Get profiles for all friends
  const otherUserIds = friendships.map((f) =>
    f.requester_id === userId ? f.addressee_id : f.requester_id
  )

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .in('clerk_id', otherUserIds)

  const profileMap = new Map((profiles || []).map((p) => [p.clerk_id, p]))

  const result = friendships.map((f) => {
    const otherUserId = f.requester_id === userId ? f.addressee_id : f.requester_id
    return {
      friendship: f,
      profile: profileMap.get(otherUserId) || null,
    }
  })

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: {
    action?: string
    addressee_clerk_id?: string
    friendship_id?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { action, addressee_clerk_id, friendship_id } = body

  if (action === 'send') {
    if (!addressee_clerk_id) {
      return NextResponse.json({ error: 'addressee_clerk_id is required' }, { status: 400 })
    }
    if (addressee_clerk_id === userId) {
      return NextResponse.json({ error: 'Cannot add yourself' }, { status: 400 })
    }

    // Check if friendship already exists
    const { data: existing } = await supabase
      .from('friendships')
      .select('id')
      .or(
        `and(requester_id.eq.${userId},addressee_id.eq.${addressee_clerk_id}),and(requester_id.eq.${addressee_clerk_id},addressee_id.eq.${userId})`
      )
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Friendship already exists' }, { status: 409 })
    }

    const { data, error } = await supabase
      .from('friendships')
      .insert({
        requester_id: userId,
        addressee_id: addressee_clerk_id,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  }

  if (action === 'accept' || action === 'reject') {
    if (!friendship_id) {
      return NextResponse.json({ error: 'friendship_id is required' }, { status: 400 })
    }

    const newStatus = action === 'accept' ? 'accepted' : 'rejected'

    const { data, error } = await supabase
      .from('friendships')
      .update({ status: newStatus })
      .eq('id', friendship_id)
      .eq('addressee_id', userId) // Only addressee can accept/reject
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
