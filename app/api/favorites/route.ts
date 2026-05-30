import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('clerk_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || [])
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { activity_title?: string; activity_icon?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { activity_title, activity_icon } = body
  if (!activity_title) {
    return NextResponse.json({ error: 'activity_title is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert({
      clerk_id: userId,
      activity_title,
      activity_icon: activity_icon || '',
    })
    .select()
    .single()

  if (error) {
    // Unique constraint violation — already favorited
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already favorited' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { activity_title?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { activity_title } = body
  if (!activity_title) {
    return NextResponse.json({ error: 'activity_title is required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('clerk_id', userId)
    .eq('activity_title', activity_title)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
