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

  // Search for a user by username (partial match, ILIKE)
  if (search) {
    const { data, error } = await supabase
      .from('profiles')
      .select('clerk_id, username, display_name, avatar_emoji, avatar_color')
      .ilike('username', `%${search.toLowerCase()}%`)
      .neq('clerk_id', userId)
      .limit(5)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ profile: null })
    }

    // Return the best match (exact first, then partial)
    const exact = data.find((p) => p.username === search.toLowerCase())
    return NextResponse.json({ profile: exact || data[0] })
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
    return NextResponse.json({ friends: [], received: [], sent: [] })
  }

  // Gather all other user IDs
  const otherUserIds = friendships.map((f) =>
    f.requester_id === userId ? f.addressee_id : f.requester_id
  )

  const { data: profiles } = await supabase
    .from('profiles')
    .select('clerk_id, username, display_name, avatar_emoji, avatar_color')
    .in('clerk_id', otherUserIds)

  const profileMap = new Map((profiles || []).map((p) => [p.clerk_id, p]))

  // Separate into friends / received requests / sent requests
  const friends: object[] = []
  const received: object[] = []
  const sent: string[] = []

  for (const f of friendships) {
    const isRequester = f.requester_id === userId
    const otherId = isRequester ? f.addressee_id : f.requester_id
    const profile = profileMap.get(otherId)

    if (f.status === 'accepted') {
      friends.push({
        clerk_id: otherId,
        username: profile?.username || '',
        display_name: profile?.display_name || 'Ukendt bruger',
        avatar_emoji: profile?.avatar_emoji || '😊',
        avatar_color: profile?.avatar_color || '#9B5DE5',
        friendship_id: f.id,
      })
    } else if (f.status === 'pending') {
      if (isRequester) {
        // We sent this request
        sent.push(otherId)
      } else {
        // We received this request
        received.push({
          clerk_id: otherId,
          username: profile?.username || '',
          display_name: profile?.display_name || 'Ukendt bruger',
          avatar_emoji: profile?.avatar_emoji || '😊',
          avatar_color: profile?.avatar_color || '#9B5DE5',
          requester_id: otherId,
          friendship_id: f.id,
        })
      }
    }
  }

  return NextResponse.json({ friends, received, sent })
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: {
    action?: string
    addressee_username?: string
    addressee_clerk_id?: string
    requester_id?: string
    friend_id?: string
    friendship_id?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { action } = body

  if (action === 'send') {
    // Support both addressee_username (new) and addressee_clerk_id (legacy)
    let targetClerkId: string | null = body.addressee_clerk_id || null

    if (!targetClerkId && body.addressee_username) {
      // Look up by username
      const { data: targetProfile, error: lookupError } = await supabase
        .from('profiles')
        .select('clerk_id')
        .eq('username', body.addressee_username.toLowerCase())
        .neq('clerk_id', userId)
        .single()

      if (lookupError || !targetProfile) {
        return NextResponse.json({ error: 'Bruger ikke fundet' }, { status: 404 })
      }
      targetClerkId = targetProfile.clerk_id
    }

    if (!targetClerkId) {
      return NextResponse.json({ error: 'addressee_username or addressee_clerk_id is required' }, { status: 400 })
    }

    if (targetClerkId === userId) {
      return NextResponse.json({ error: 'Cannot add yourself' }, { status: 400 })
    }

    // Check if friendship already exists
    const { data: existing } = await supabase
      .from('friendships')
      .select('id')
      .or(
        `and(requester_id.eq.${userId},addressee_id.eq.${targetClerkId}),and(requester_id.eq.${targetClerkId},addressee_id.eq.${userId})`
      )
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'Friendship already exists' }, { status: 409 })
    }

    const { data, error } = await supabase
      .from('friendships')
      .insert({
        requester_id: userId,
        addressee_id: targetClerkId,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  }

  if (action === 'accept') {
    // Support both requester_id (new) and friendship_id (legacy)
    if (body.requester_id) {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('requester_id', body.requester_id)
        .eq('addressee_id', userId)
        .eq('status', 'pending')
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json(data)
    }

    if (body.friendship_id) {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('id', body.friendship_id)
        .eq('addressee_id', userId)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'requester_id or friendship_id is required' }, { status: 400 })
  }

  if (action === 'reject') {
    if (body.requester_id) {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status: 'rejected' })
        .eq('requester_id', body.requester_id)
        .eq('addressee_id', userId)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json(data)
    }

    if (body.friendship_id) {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status: 'rejected' })
        .eq('id', body.friendship_id)
        .eq('addressee_id', userId)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'requester_id or friendship_id is required' }, { status: 400 })
  }

  if (action === 'remove') {
    const friendId = body.friend_id
    if (!friendId) {
      return NextResponse.json({ error: 'friend_id is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('friendships')
      .delete()
      .or(
        `and(requester_id.eq.${userId},addressee_id.eq.${friendId}),and(requester_id.eq.${friendId},addressee_id.eq.${userId})`
      )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
