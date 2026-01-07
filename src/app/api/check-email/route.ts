// src/app/api/check-email/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Missing Supabase env vars on server. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
  )
}

// Server-side admin client (SERVICE ROLE KEY — must NOT be exposed to browser)
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

/**
 * POST: { email: string } -> { exists: boolean } or { error }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email: string | undefined = body?.email
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

    // Pagination parameters
    const perPage = 1000
    let page = 1

    while (true) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })

      const users = data?.users ?? []
      const found = users.some((u) => (u.email ?? '').toLowerCase() === email.toLowerCase())
      if (found) return NextResponse.json({ exists: true })

      // if less than perPage then we reached end
      if (users.length < perPage) break
      page++
    }

    return NextResponse.json({ exists: false })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 })
  }
}
