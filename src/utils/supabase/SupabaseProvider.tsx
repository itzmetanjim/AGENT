'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from './client'

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const router = useRouter()
  const [isSessionChecked, setIsSessionChecked] = useState(false)

  useEffect(() => {
    const url = new URL(window.location.href)
    const access_token = url.searchParams.get('access_token')
    const refresh_token = url.searchParams.get('refresh_token')

    const checkSession = async () => {
      if (access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token })
        router.replace('/')
      }

      setIsSessionChecked(true)
    }

    checkSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (!isSessionChecked) return null

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
