import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Signup } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

// Fallback JSON storage functions
const SIGNUPS_FILE = path.join(process.cwd(), 'data', 'signups.json')

function ensureDataDirectory() {
  const dataDir = path.dirname(SIGNUPS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function readSignups() {
  ensureDataDirectory()
  try {
    if (fs.existsSync(SIGNUPS_FILE)) {
      const data = fs.readFileSync(SIGNUPS_FILE, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading signups file:', error)
    return []
  }
}

function writeSignups(signups: any[]) {
  ensureDataDirectory()
  try {
    fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2))
  } catch (error) {
    console.error('Error writing signups file:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  let email: string = ''
  
  try {
    const requestBody = await request.json()
    email = requestBody.email

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

    let useSupabase = false
    
    if (isSupabaseConfigured() && supabase) {
      try {
        // Use Supabase storage
        const { data: existingSignup, error: selectError } = await supabase
          .from('SignUps')
          .select('email')
          .eq('email', email)
          .maybeSingle()

        if (selectError) {
          console.error('Supabase select error:', selectError)
        } else {
          if (existingSignup) {
            return NextResponse.json(
              { error: 'This email is already registered' },
              { status: 400 }
            )
          }

          const newSignup = {
            email
          }

          const { error: insertError } = await supabase
            .from('SignUps')
            .insert([newSignup])

          if (insertError) {
            console.error('Supabase insert error:', insertError)
          } else {
            useSupabase = true
          }
        }
      } catch (supabaseError) {
        console.error('Supabase connection error:', supabaseError)
      }
    }
    
    if (!useSupabase) {
      // Use JSON file storage as fallback
      const signups = readSignups()
      
      if (signups.some((signup: any) => signup.email === email)) {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 400 }
        )
      }

      const newSignup = {
        email,
        timestamp: new Date().toISOString(),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }

      signups.push(newSignup)
      writeSignups(signups)
    }

    // Log signup method for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`New signup: ${email} (using ${useSupabase ? 'Supabase' : 'JSON file'})`)
    }

    return NextResponse.json(
      { success: true, message: 'Successfully signed up!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    
    // Always fall back to JSON storage if something goes wrong
    try {
      const signups = readSignups()
      
      if (!signups.some((signup: any) => signup.email === email)) {
        const newSignup = {
          email,
          timestamp: new Date().toISOString(),
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown'
        }
        signups.push(newSignup)
        writeSignups(signups)
        
        return NextResponse.json(
          { success: true, message: 'Successfully signed up!' },
          { status: 200 }
        )
      } else {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 400 }
        )
      }
    } catch (fallbackError) {
      console.error('Fallback storage error:', fallbackError)
      return NextResponse.json(
        { error: 'An internal error occurred. Please try again.' },
        { status: 500 }
      )
    }
  }
}

export async function GET() {
  try {
    if (isSupabaseConfigured() && supabase) {
      // Use Supabase storage
      const { data: signups, error } = await supabase
        .from('SignUps')
        .select('email, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
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
    } else {
      // Use JSON file storage as fallback
      const signups = readSignups()
      
      return NextResponse.json({
        count: signups.length,
        signups: signups.map((signup: any) => ({
          email: signup.email,
          timestamp: signup.timestamp
        }))
      })
    }
  } catch (error) {
    console.error('Error fetching signups:', error)
    return NextResponse.json(
      { error: 'Failed to fetch signups' },
      { status: 500 }
    )
  }
}