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

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 3 // Max 3 signups per IP per window

function getRateLimitKey(ip: string): string {
  return `signup:${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const attempts = rateLimitMap.get(key) || []
  
  // Clean old attempts
  const recentAttempts = attempts.filter((time: number) => now - time < RATE_LIMIT_WINDOW)
  rateLimitMap.set(key, recentAttempts)
  
  return recentAttempts.length >= MAX_ATTEMPTS
}

function recordAttempt(ip: string): void {
  const key = getRateLimitKey(ip)
  const attempts = rateLimitMap.get(key) || []
  attempts.push(Date.now())
  rateLimitMap.set(key, attempts)
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting and logging
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Rate limiting check
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // Check for existing email
    const { data: existingSignup, error: selectError } = await supabase
      .from('SignUps')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (selectError) {
      console.error('Supabase select error:', selectError)
      return NextResponse.json(
        { error: 'Database error occurred. Please try again.' },
        { status: 500 }
      )
    }

    if (existingSignup) {
      // Record attempt even for existing emails (security)
      recordAttempt(clientIP)
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      )
    }

    // Insert new signup with additional security data
    const { error: insertError } = await supabase
      .from('SignUps')
      .insert([{ 
        email: normalizedEmail,
        ip_address: clientIP,
        user_agent: request.headers.get('user-agent') || 'unknown'
      }])

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save signup. Please try again.' },
        { status: 500 }
      )
    }

    // Record successful attempt for rate limiting
    recordAttempt(clientIP)

    return NextResponse.json(
      { success: true, message: 'Successfully signed up!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// SECURITY: Remove public GET endpoint to protect user emails
// Admin access should be through Supabase dashboard or separate authenticated endpoint