// src/utils/supabase/getUserSession.ts
'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const getUserSession = async () => {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          })),
        setAll: async (cookiesToSet) => {
          cookiesToSet.forEach((cookie) => {
            cookieStore.set(cookie.name, cookie.value, cookie.options)
          })
        },
      },
    }
  )

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error('Error fetching session:', error.message)
    return null
  }

  return session
}
