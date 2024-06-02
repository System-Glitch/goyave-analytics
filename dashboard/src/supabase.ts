import { createClient } from '@supabase/supabase-js'

const client = import.meta.env.VITE_CLIENT_URL
const anon = import.meta.env.VITE_ANON_KEY

const supabase = createClient(client, anon)

export interface ByTime {
  viewed_at: string
  count: number
}

export interface ByURI {
  uri: string
  count: number
}

export async function login(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  if (error) {
    throw error
  }  
}

export async function getOverall(): Promise<ByTime[]> {
  const { data, error } = await supabase.from('overall').select().order('viewed_at', {ascending: true})
  if (error) {
    throw error
  }
  return data as ByTime[]
}

export async function getPerPage(): Promise<ByURI[]> {
  const { data, error } = await supabase.from('per_page').select().order('uri', {ascending: true})
  if (error) {
    throw error
  }
  return data as ByURI[]
}