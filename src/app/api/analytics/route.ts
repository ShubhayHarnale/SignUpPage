import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { AnalyticsEvent } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

// Fallback JSON storage functions
const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json')

function ensureDataDirectory() {
  const dataDir = path.dirname(ANALYTICS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function readAnalytics() {
  ensureDataDirectory()
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const data = fs.readFileSync(ANALYTICS_FILE, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading analytics file:', error)
    return []
  }
}

function writeAnalytics(analytics: any[]) {
  ensureDataDirectory()
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2))
  } catch (error) {
    console.error('Error writing analytics file:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    let useSupabase = false
    
    if (isSupabaseConfigured() && supabase) {
      try {
        // Use Supabase storage
        const newEvent: AnalyticsEvent = {
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
          .from('analytics')
          .insert([newEvent])

        if (error) {
          console.error('Supabase analytics error:', error)
          console.log('Falling back to JSON storage for analytics')
        } else {
          useSupabase = true
        }
      } catch (supabaseError) {
        console.error('Supabase analytics connection error:', supabaseError)
        console.log('Falling back to JSON storage for analytics')
      }
    }
    
    if (!useSupabase) {
      // Use JSON file storage as fallback
      const analytics = readAnalytics()
      
      const newEvent = {
        event: eventData.event,
        action: eventData.action,
        platform: eventData.platform,
        currentTime: eventData.currentTime,
        page: eventData.page,
        userAgent: eventData.userAgent || request.headers.get('user-agent') || 'unknown',
        referrer: eventData.referrer,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        timestamp: new Date().toISOString()
      }

      analytics.push(newEvent)
      writeAnalytics(analytics)
    }

    console.log(`Analytics event: ${eventData.event} (using ${useSupabase ? 'Supabase' : 'JSON file'})`)

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    let analytics: any[] = []

    if (isSupabaseConfigured() && supabase) {
      // Use Supabase storage
      const { data, error } = await supabase
        .from('analytics')
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

      analytics = data || []
    } else {
      // Use JSON file storage as fallback
      analytics = readAnalytics()
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 1000) // Limit to recent 1000 events
    }

    // Basic analytics summary
    const summary = {
      totalEvents: analytics.length,
      pageViews: analytics.filter((event) => event.event === 'page_view').length,
      signupAttempts: analytics.filter((event) => event.event === 'signup_attempt').length,
      signupSuccesses: analytics.filter((event) => event.event === 'signup_success').length,
      videoInteractions: analytics.filter((event) => event.event === 'video_interaction').length,
      recentEvents: analytics.slice(0, 10)
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