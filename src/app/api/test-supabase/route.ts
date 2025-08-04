import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL_SET: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY_SET: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_URL_VALUE: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...',
      IS_CONFIGURED: isSupabaseConfigured(),
      CLIENT_EXISTS: !!supabase
    }

    // If Supabase is configured, test the connection
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('SignUps')
          .select('count')
          .limit(1)

        if (error) {
          return NextResponse.json({
            status: 'error',
            message: 'Supabase connection failed',
            error: {
              code: error.code,
              message: error.message,
              details: error.details
            },
            environment: envCheck
          })
        }

        return NextResponse.json({
          status: 'success',
          message: 'Supabase connection working',
          environment: envCheck
        })
      } catch (connectionError) {
        return NextResponse.json({
          status: 'error',
          message: 'Supabase connection exception',
          error: connectionError instanceof Error ? connectionError.message : 'Unknown error',
          environment: envCheck
        })
      }
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase not configured',
        environment: envCheck
      })
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Test endpoint failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}