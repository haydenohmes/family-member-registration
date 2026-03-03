"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

/**
 * Redirects /register/[program]?token=...&athlete=... to /checkout with same params.
 * Use this when the invite email link points to /register/[program].
 */
export default function RegisterProgramPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const program = typeof params?.program === "string" ? params.program : ""

  useEffect(() => {
    const athlete = searchParams.get("athlete") ?? ""
    const token = searchParams.get("token") ?? ""
    const q = new URLSearchParams()
    if (program) q.set("program", program)
    if (athlete) q.set("athlete", athlete)
    if (token) q.set("token", token)
    router.replace(`/checkout?${q.toString()}`)
  }, [program, searchParams, router])

  return (
    <div className="min-h-screen bg-[#191f24] flex items-center justify-center text-white">
      Redirecting…
    </div>
  )
}
