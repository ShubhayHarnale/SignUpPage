import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client directly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    nodeEnv: process.env.NODE_ENV
  })
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    // Store analytics event in Supabase
    const newEvent = {
      event: eventData.event,
      action: eventData.action,
      platform: eventData.platform,
      current_time: eventData.currentTime,
      page: eventData.page,
      user_agent: eventData.userAgent || request.headers.get('user-agent') || 'unknown',
      referrer: eventData.referrer,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

    const { error } = await supabase
      .from('Analytics')
      .insert([newEvent])

    if (error) {
      console.error('Supabase analytics error:', error)
      // Still return success for analytics (non-critical)
      return NextResponse.json({ success: true }, { status: 200 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Analytics error:', error)
    // Analytics failures shouldn't break the user experience
    return NextResponse.json({ success: true }, { status: 200 })
  }
}

export async function GET() {
  try {
    // Fetch analytics from Supabase
    const { data: analytics, error } = await supabase
      .from('Analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000) // Limit to recent 1000 events

    if (error) {
      console.error('Supabase analytics error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      )
    }

    // Basic analytics summary
    const summary = {
      totalEvents: analytics?.length || 0,
      pageViews: analytics?.filter((event) => event.event === 'page_view').length || 0,
      signupAttempts: analytics?.filter((event) => event.event === 'signup_attempt').length || 0,
      signupSuccesses: analytics?.filter((event) => event.event === 'signup_success').length || 0,
      videoInteractions: analytics?.filter((event) => event.event === 'video_interaction').length || 0,
      recentEvents: analytics?.slice(0, 10) || []
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}