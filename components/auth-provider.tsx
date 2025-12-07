import { ensureUserProfile } from '@/lib/db'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient, User } from '@supabase/supabase-js'

type SupabaseContext = {
  supabase: SupabaseClient
  user: User | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      try {
        console.debug('[AUTH PROVIDER] onAuthStateChange session', { session })
      } catch (err) {
        // ignore
      }
      if (session?.user) {
        await ensureUserProfile(session.user)
      }
      setUser(session?.user ?? null)
    })

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        console.debug('[AUTH PROVIDER] getSession result', { session })
      } catch (err) {}

      if (session?.user) {
        await ensureUserProfile(session.user)
      }
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <Context.Provider value={{ supabase, user }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside AuthProvider')
  }

  return context
}
