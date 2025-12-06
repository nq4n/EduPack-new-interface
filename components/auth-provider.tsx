'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/browser-client'
import { ensureUserProfile } from '@/lib/user-profile'
import type { SupabaseClient, User } from '@supabase/supabase-js'

type SupabaseContext = {
  supabase: SupabaseClient
  user: User | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        await ensureUserProfile(session.user)
      }
      setUser(session?.user ?? null)
    })

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await ensureUserProfile(session.user)
      }
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

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
