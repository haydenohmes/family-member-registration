"use client"

import React, { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown } from "lucide-react"

function ProfileBanner({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-b from-[rgba(11,33,57,0.9)] to-[rgba(0,0,0,0)] flex flex-col items-center justify-center px-[var(--space-one-and-half,24px)] py-[40px] relative w-full min-h-[120px] !items-center !justify-center ${className || ""}`}
    >
      <p
        className="bg-clip-text bg-gradient-to-b font-light from-[#e6f2ff] from-[40.104%] leading-[0.8] text-[72px] to-[#c3cedb] to-[80.208%] tracking-[5.76px] uppercase [-webkit-text-fill-color:transparent] [background-clip:text] text-center"
        style={{ fontFamily: "Teko, sans-serif" }}
      >
        Sporting Youth Soccer
      </p>
    </div>
  )
}

function DesktopNavbar({ className, isAuth = true }: { className?: string; isAuth?: boolean }) {
  return (
    <div className={`bg-white flex flex-col items-start relative w-full ${isAuth ? "h-[48px]" : ""} ${className || ""}`}>
      <div
        className={`bg-[#101417] flex h-[48px] items-center justify-between relative shrink-0 w-full ${
          isAuth ? "pl-[var(--spacing-one,16px)]" : "px-[var(--spacing-one,16px)]"
        }`}
      >
        <span className="text-white text-xl font-bold">hudl</span>
        {isAuth && (
          <div className="flex gap-2 items-center pr-4">
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

function CheckoutCompleteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const programSlug = searchParams.get("program") ?? "sample-program"
  const programTitle = programSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  const athlete = searchParams.get("athlete") ?? ""
  const athleteName = athlete ? decodeURIComponent(athlete) : "John Doe"

  return (
    <div className="bg-[var(--u-color-background-canvas,#191f24)] flex flex-col gap-0 isolate items-start overflow-clip relative rounded-[12px] min-h-screen w-full">
      <DesktopNavbar className="bg-white flex flex-col h-[48px] items-start shrink-0 sticky top-0 w-full z-[3]" isAuth />
      <div className="flex flex-1 flex-col isolate items-start overflow-x-clip overflow-y-auto relative w-full z-[2]">
        <div className="flex flex-col items-center relative shrink-0 w-full z-[1]">
          <div className="w-full flex justify-center">
            <ProfileBanner
              className="bg-gradient-to-b flex flex-col from-[rgba(11,33,57,0.9)] gap-0 isolate items-start w-full overflow-clip px-[var(--space-one-and-half,24px)] py-[40px] relative shrink-0 to-[rgba(0,0,0,0)]"
            />
          </div>
          <div className="flex flex-col items-start w-full pb-[var(--space-one-and-half,24px)] relative shrink-0 px-4 md:px-8">
            <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pt-[var(--space-one-and-half,24px)]">
              <h1 className="text-[32px] font-bold text-[#fefefe] leading-[1.2]">Order confirmed</h1>
              <div className="flex flex-col gap-4 text-[#c0c6cd] text-base leading-[1.4]">
                <p>Thank you for your order. Your registration for {programTitle} – {athleteName} has been completed.</p>
              </div>
              <button
                type="button"
                onClick={() => router.push("/registration")}
                className="bg-[#0273e3] text-white hover:bg-[#0260c4] min-h-[40px] px-[var(--space-one,16px)] rounded-[var(--border-radius-large,4px)] cursor-pointer transition-colors w-fit"
                style={{ fontFamily: "var(--font-body, Barlow), sans-serif", fontSize: "var(--font-size-default, 16px)", fontWeight: "bold" }}
              >
                Back to Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutCompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--u-color-background-canvas,#191f24)] flex items-center justify-center text-white">Loading…</div>}>
      <CheckoutCompleteContent />
    </Suspense>
  )
}
