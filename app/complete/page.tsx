"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"
import { ChevronDown } from "lucide-react"

type ProfileBannerProps = {
  className?: string
  breakpoint?: "xl" | "l" | "m" | "s"
}

function ProfileBanner({ className, breakpoint = "xl" }: ProfileBannerProps) {
  return (
    <div
      className={`bg-gradient-to-b from-[rgba(11,33,57,0.9)] to-[rgba(0,0,0,0)] flex flex-col items-center justify-center px-[var(--space-one-and-half,24px)] py-[40px] relative w-full min-h-[120px] !items-center !justify-center ${className || ""}`}
    >
      <p className="bg-clip-text bg-gradient-to-b font-light from-[#e6f2ff] from-[40.104%] leading-[0.8] text-[72px] to-[#c3cedb] to-[80.208%] tracking-[5.76px] uppercase [-webkit-text-fill-color:transparent] [background-clip:text] text-center" style={{ fontFamily: "Teko, sans-serif" }}>
        Sporting Youth Soccer
      </p>
    </div>
  )
}

type DesktopNavbarProps = {
  className?: string
  isAuth?: boolean
}

function DesktopNavbar({ className, isAuth = false }: DesktopNavbarProps) {
  return (
    <div
      className={`bg-white flex flex-col items-start relative w-full ${isAuth ? "h-[48px]" : ""} ${className || ""}`}
    >
      <div
        className={`bg-[#101417] flex h-[48px] items-center justify-between relative shrink-0 w-full ${
          isAuth ? "pl-[var(--spacing-one,16px)]" : "px-[var(--spacing-one,16px)]"
        }`}
      >
        <span className="text-white text-xl font-bold">hudl</span>
        {isAuth && (
          <div className="flex gap-2 items-center">
            <span className="text-[#e6f2ff] text-sm">John Doe</span>
            <div className="bg-[#506277] border border-white border-solid flex items-center justify-center size-7 rounded-full">
              <span className="text-white text-xs font-bold">JD</span>
            </div>
            <ChevronDown className="size-4 text-[#e6f2ff] rotate-180" />
          </div>
        )}
      </div>
    </div>
  )
}

type EmailStatus = "idle" | "sending" | "sent" | "error"

export default function CompletePage() {
  const router = useRouter()
  const [athleteName, setAthleteName] = useState<string>("Your athlete")
  const [programName, setProgramName] = useState<string>("this registration")
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle")
  const [confirmationEmail, setConfirmationEmail] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")

  useEffect(() => {
    // Read context before clearing
    const currentRegistration = localStorage.getItem("currentRegistration")
    const email = sessionStorage.getItem("waitlistConfirmationEmail")
    let selectedAthlete: { id: string; name: string } | null = null
    try {
      const raw = sessionStorage.getItem("selectedAthlete")
      if (raw) selectedAthlete = JSON.parse(raw)
    } catch {
      // ignore
    }

    if (currentRegistration) {
      setProgramName(currentRegistration)
      const stored = localStorage.getItem("joinedRegistrations")
      const joinedSet = stored ? new Set(JSON.parse(stored)) : new Set()
      joinedSet.add(currentRegistration)
      localStorage.setItem("joinedRegistrations", JSON.stringify(Array.from(joinedSet)))
      localStorage.removeItem("currentRegistration")
      window.dispatchEvent(new Event("localStorageUpdate"))

      // Notify director app: POST to the shared waitlist API (director reads from http://localhost:3001)
      const directorWaitlistUrl =
        process.env.NEXT_PUBLIC_DIRECTOR_WAITLIST_API_URL ?? "http://localhost:3001/api/waitlist-entries"
      fetch(directorWaitlistUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteName: selectedAthlete?.name ?? "Your athlete",
          programName: currentRegistration,
          email: email ?? "",
        }),
      }).catch(() => {})
    }

    if (selectedAthlete?.name) setAthleteName(selectedAthlete.name)
    if (email) setConfirmationEmail(email)
  }, [])

  return (
    <div className="bg-[var(--u-color-background-canvas,#191f24)] flex flex-col gap-0 isolate items-start overflow-clip relative rounded-[12px] min-h-screen w-full">
      <DesktopNavbar className="bg-white flex flex-col h-[48px] items-start shrink-0 sticky top-0 w-full z-[3]" isAuth />
      <div className="flex flex-1 flex-col isolate items-start overflow-x-clip overflow-y-auto relative w-full z-[2]">
        <div className="flex flex-col items-center relative shrink-0 w-full z-[1]">
          <div className="w-full flex justify-center">
            <ProfileBanner
              breakpoint="l"
              className="bg-gradient-to-b flex flex-col from-[rgba(11,33,57,0.9)] gap-0 isolate items-start max-w-[1919px] min-w-[1366px] overflow-clip px-[var(--space-one-and-half,24px)] py-[40px] relative shrink-0 to-[rgba(0,0,0,0)] w-[1512px]"
            />
          </div>
          <div className="flex flex-col gap-[var(--space-one-and-half,24px)] items-center max-w-[1128px] pb-[var(--space-three,48px)] relative shrink-0 w-full">
            <div className="flex flex-col gap-[var(--space-one,16px)] items-start max-w-[1365px] min-w-[768px] pb-[var(--space-two,32px)] pt-[var(--space-one-and-half,24px)] relative shrink-0 w-full">
              <div className="flex flex-col gap-[var(--space-one,16px)] items-start relative shrink-0 w-full">
                <div className="flex flex-col justify-end leading-[0] relative shrink-0 w-full" style={{ color: '#fefefe', fontSize: 'var(--font-size-plus-five, 32px)', letterSpacing: 'var(--letter-spacing-more, 0.25px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif', fontWeight: 'bold' }}>
                  <p className="leading-[1.2] whitespace-pre-wrap">Confirm your waitlist spot</p>
                </div>
              </div>
              <div className="flex flex-col justify-center leading-[0] relative shrink-0 w-full gap-2" style={{ color: '#c0c6cd', fontSize: 'var(--font-size-0, 16px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                <p className="leading-[1.4] whitespace-pre-wrap">
                  You&apos;re about to add {athleteName} to the waitlist for {programName}. Click Join Waitlist to complete registration and receive your confirmation email.
                </p>
                {confirmationEmail && (
                  <p className="leading-[1.4] whitespace-pre-wrap mt-2">
                    {emailStatus === "sending" && "Sending confirmation email…"}
                    {emailStatus === "sent" && `Confirmation email sent to ${confirmationEmail}.`}
                    {emailStatus === "error" && (
                      <>
                        We couldn’t send the confirmation email. You’re still on the waitlist.
                        {emailError && (
                          <span className="block mt-2 text-[14px]" style={{ color: "#85909e" }}>
                            {emailError}
                          </span>
                        )}
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0f1215] border-t border-[#42474c] border-solid flex items-center justify-between max-w-[1919px] min-w-[1366px] overflow-clip px-[var(--space-one-and-half,24px)] py-[var(--space-one,16px)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.5),0px_0px_4px_0px_rgba(0,0,0,0.2)] shrink-0 sticky bottom-0 w-full z-[10]">
        <div className="flex flex-1 items-center justify-between w-full min-h-px min-w-px relative">
          <button
            onClick={() => router.back()}
            className="bg-[#0f1215] border border-[#42474c] text-white hover:bg-[#1a1d22] min-h-[40px] px-[var(--space-one,16px)] rounded-[var(--border-radius-large,4px)] cursor-pointer transition-colors"
            style={{ fontFamily: 'var(--font-body, Barlow), sans-serif', fontSize: 'var(--font-size-default, 16px)', fontWeight: 'bold' }}
          >
            Back
          </button>
          <button
            disabled={emailStatus === "sending"}
            onClick={async () => {
              if (confirmationEmail) {
                setEmailStatus("sending")
                try {
                  const res = await fetch("/api/send-waitlist-confirmation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      to: confirmationEmail,
                      athleteName,
                      programName,
                    }),
                  })
                  if (res.ok) {
                    setEmailStatus("sent")
                    toast("Email has been sent.")
                    sessionStorage.removeItem("waitlistConfirmationEmail")
                    sessionStorage.removeItem("selectedAthlete")
                  } else {
                    const data = await res.json().catch(() => ({}))
                    setEmailError((data as { error?: string })?.error ?? "Something went wrong")
                    setEmailStatus("error")
                  }
                } catch {
                  setEmailError("Network error. Check your connection.")
                  setEmailStatus("error")
                }
              }
              sessionStorage.setItem('fromCompletePage', 'true')
              window.location.href = '/registration'
            }}
            className="bg-[#0273e3] text-white hover:bg-[#0260c4] min-h-[40px] px-[var(--space-one,16px)] rounded-[var(--border-radius-large,4px)] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-body, Barlow), sans-serif', fontSize: 'var(--font-size-default, 16px)', fontWeight: 'bold' }}
          >
            {emailStatus === "sending" ? "Sending…" : "Join Waitlist"}
          </button>
        </div>
      </div>
    </div>
  )
}

