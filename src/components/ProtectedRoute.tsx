"use client"

import { useEffect, useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user === null) {
      // User is logged out, redirect to login
      router.replace("/login")
    } else {
      setLoading(false)
    }
  }, [user, router])

  if (loading) return null

  return <>{children}</>
}
