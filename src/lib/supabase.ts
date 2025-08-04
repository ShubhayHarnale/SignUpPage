import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a client only if both URL and key are provided and valid
export const supabase = (supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your-supabase-url-here' && 
  supabaseAnonKey !== 'your-supabase-anon-key-here')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null
}

// Database types
export interface Signup {
  id?: number
  email: string
  created_at?: string
  ip_address?: string
  user_agent?: string
}

export interface AnalyticsEvent {
  id?: number
  event: string
  action?: string
  platform?: string
  current_time?: number
  page?: string
  user_agent?: string
  referrer?: string
  ip_address?: string
  created_at?: string
}