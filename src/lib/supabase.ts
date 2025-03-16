import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type for the database row
export type ContactRow = {
  id: string
  created_at: string
  name: string
  phone_number: string
  email: string | null
  category: 'family' | 'friend' | 'work' | 'other'
} 