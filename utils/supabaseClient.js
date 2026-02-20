import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || (!supabaseAnonKey && !supabaseServiceRoleKey)) {
    throw new Error('Missing Supabase environment variables')
}

// Prefer Service Role Key for backend operations if available
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey)
