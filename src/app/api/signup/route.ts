import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      console.error('❌ Supabase not configured')
      return NextResponse.json(
        { error: 'Database service unavailable' },
        { status: 500 }
      )
    }

    // Check for existing email
    const { data: existingSignup, error: selectError } = await supabase
      .from('SignUps')
      .select('email')
      .eq('email', email)
      .maybeSingle()

    if (selectError) {
      console.error('❌ Supabase select error:', selectError)
      return NextResponse.json(
        { error: 'Database error occurred. Please try again.' },
        { status: 500 }
      )
    }

    if (existingSignup) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      )
    }

    // Insert new signup
    const { error: insertError } = await supabase
      .from('SignUps')
      .insert([{ email }])

    if (insertError) {
      console.error('❌ Supabase insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save signup. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Successfully signed up!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Signup error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Database service unavailable' },
        { status: 500 }
      )
    }

    // Fetch signups from Supabase
    const { data: signups, error } = await supabase
      .from('SignUps')
      .select('email, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch signups' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      count: signups?.length || 0,
      signups: signups?.map((signup) => ({
        email: signup.email,
        timestamp: signup.created_at
      })) || []
    })
  } catch (error) {
    console.error('❌ Error fetching signups:', error)
    return NextResponse.json(
      { error: 'Failed to fetch signups' },
      { status: 500 }
    )
  }
}