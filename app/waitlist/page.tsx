"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
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

type AthleteSelectionProps = {
  name: string
  initials: string
  birthYear?: string
  isSelected?: boolean
  onSelect?: () => void
}

function AthleteSelection({ name, initials, birthYear, isSelected = false, onSelect }: AthleteSelectionProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isActive = isSelected || isHovered

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer flex gap-0 items-center min-h-[56px] pl-[var(--space-three-quarter,12px)] pr-[var(--space-one-and-quarter,20px)] py-[var(--space-three-quarter,12px)] relative rounded-[8px] w-full border transition-all ${
        isActive
          ? 'bg-[#0d1a2e] border-[#0273e3]'
          : 'bg-[#0f1215] border-transparent'
      }`}
    >
      <div className="flex flex-1 gap-[var(--space-one,16px)] items-center min-h-px min-w-px relative">
        <div className="flex flex-1 gap-[var(--space-half,8px)] items-center min-h-px min-w-px relative">
          <div className="flex items-center p-[var(--space-eighth,2px)] relative shrink-0 size-[32px]">
            <div
              className={`border border-white border-solid flex flex-1 h-full items-center justify-center min-h-px min-w-px relative rounded-full transition-colors ${
                isActive ? 'bg-[#c0c6cd]' : 'bg-[#506277]'
              }`}
            >
              <div className="flex flex-1 flex-col h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[12px] text-center tracking-[-0.3px] font-bold transition-colors" style={{ color: isActive ? '#36485c' : '#ffffff' }}>
                <p className="leading-none whitespace-pre-wrap">{initials}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 gap-[var(--size-small,4px)] items-baseline leading-[1.4] min-h-px min-w-px relative text-ellipsis text-left">
            <p className="overflow-hidden relative shrink-0 text-[16px]" style={{ color: '#c0c6cd', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
              {name}
            </p>
            {birthYear && (
              <p className="overflow-hidden relative shrink-0 text-[12px]" style={{ color: '#607081', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                {birthYear}
              </p>
            )}
          </div>
        </div>
        <div className="relative shrink-0 size-[16px] overflow-hidden">
          <div className="absolute inset-[6.25%]">
            {isSelected ? (
              <div className="size-full rounded-full border-2 border-[#0273e3] bg-[#0273e3] flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-white" />
              </div>
            ) : (
              <div className="size-full rounded-full border border-[#607081] bg-transparent" />
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function WaitlistPage() {
  const router = useRouter()
  const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null)

  const athletes = [
    { id: '1', name: 'Hayden Ohmes', initials: 'HO', birthYear: '2016' },
    { id: '2', name: 'Lena Lankas', initials: 'LL', birthYear: '2015' },
  ]

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
          <div className="flex flex-col gap-[var(--space-one-and-half,24px)] items-start max-w-[1128px] pb-[var(--space-one-and-half,24px)] relative shrink-0 w-full">
            <div className="flex flex-col gap-[var(--space-half,8px)] items-start max-w-[1365px] min-w-[768px] pb-[var(--space-two,32px)] pt-[var(--space-one-and-half,24px)] relative shrink-0 w-full">
              <div className="flex flex-col gap-[var(--space-one,16px)] items-start relative shrink-0 w-full">
                <div className="flex flex-col justify-end leading-[0] relative shrink-0 w-full" style={{ color: '#fefefe', fontSize: 'var(--font-size-plus-five, 32px)', letterSpacing: 'var(--letter-spacing-more, 0.25px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif', fontWeight: 'bold' }}>
                  <p className="leading-[1.2] whitespace-pre-wrap">Select Athlete</p>
                </div>
              </div>
              <div className="flex flex-col justify-center leading-[0] relative shrink-0 w-full" style={{ color: '#c0c6cd', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                <p className="text-[16px] whitespace-pre-wrap">
                  <span className="leading-[1.4]">You're joining the waitlist for </span>
                  <span className="font-bold leading-[1.4] not-italic">Boys & Girls Stripes | Ages: 13-14 (Parent - Child).</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 relative shrink-0 w-full max-w-[461px]">
              {athletes.map((athlete) => (
                <AthleteSelection
                  key={athlete.id}
                  name={athlete.name}
                  initials={athlete.initials}
                  birthYear={athlete.birthYear}
                  isSelected={selectedAthlete === athlete.id}
                  onSelect={() => setSelectedAthlete(athlete.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0f1215] border-t border-[#42474c] border-solid flex items-center justify-between max-w-[1919px] min-w-[1366px] overflow-clip px-[var(--space-one-and-half,24px)] py-[var(--space-one,16px)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.5),0px_0px_4px_0px_rgba(0,0,0,0.2)] shrink-0 sticky bottom-0 w-full z-[1]">
        <div className="flex flex-1 items-center justify-between w-full min-h-px min-w-px relative">
          <button
            onClick={() => router.back()}
            className="bg-[#0f1215] border border-[#42474c] text-white hover:bg-[#1a1d22] min-h-[40px] px-[var(--space-one,16px)] rounded-[var(--border-radius-large,4px)] cursor-pointer transition-colors"
            style={{ fontFamily: 'var(--font-body, Barlow), sans-serif', fontSize: 'var(--font-size-default, 16px)', fontWeight: 'bold' }}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (selectedAthlete) {
                const athlete = athletes.find((a) => a.id === selectedAthlete)
                if (athlete) {
                  sessionStorage.setItem(
                    "selectedAthlete",
                    JSON.stringify({ id: athlete.id, name: athlete.name })
                  )
                }
                router.push("/questions")
              }
            }}
            disabled={!selectedAthlete}
            className="bg-[#0273e3] text-white hover:bg-[#0260c4] min-h-[40px] px-[var(--space-one,16px)] rounded-[var(--border-radius-large,4px)] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-body, Barlow), sans-serif', fontSize: 'var(--font-size-default, 16px)', fontWeight: 'bold' }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

