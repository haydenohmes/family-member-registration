"use client"

import React, { useEffect, useState } from "react"
import { ChevronDown, Check, Info } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

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

type RegistrationCardProps = {
  price: string
  title: string
  startDate: string
  endDate: string
  eligibleAthletes?: string[]
  showAddAthlete?: boolean
  onJoinWaitlist?: () => void
  onRemoveAthlete?: () => void
  isJoined?: boolean
}

function RegistrationCard({
  price,
  title,
  startDate,
  endDate,
  eligibleAthletes = [],
  showAddAthlete = true,
  onJoinWaitlist,
  onRemoveAthlete,
  isJoined = false,
}: RegistrationCardProps) {
  return (
    <div className="bg-[#21262b] flex flex-col gap-[var(--space-one-and-quarter,20px)] items-start max-w-[1365px] min-w-[768px] pb-[var(--space-one-and-half,24px)] pt-[var(--space-one-and-quarter,20px)] px-[var(--space-one-and-quarter,20px)] relative rounded-[var(--space-small,8px)] shrink-0 w-[1128px]">
      <div className="flex flex-col gap-[var(--space-quarter,4px)] items-start relative shrink-0 w-full">
        <div className="flex items-center justify-between relative shrink-0 w-full">
          <p className="leading-[1.4] relative shrink-0" style={{ color: '#96ccf3', fontSize: 'var(--font-size-plus-one, 18px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
            {price}
          </p>
          <button className="cursor-pointer flex items-center justify-center overflow-clip p-[var(--space-quarter,4px)] relative rounded-[var(--small,2px)] shrink-0 size-[24px]">
            <ChevronDown className="size-4" style={{ color: '#c0c6cd' }} />
          </button>
        </div>
        <div className="flex gap-[var(--space-one,16px)] items-end relative shrink-0 w-full">
          <div className="flex flex-1 flex-col gap-[var(--space-three-quarter,12px)] items-start min-h-px min-w-px relative">
            <div className="flex flex-col gap-[var(--space-quarter,4px)] items-start relative shrink-0 tracking-normal w-full">
              <p className="leading-[1.2] overflow-hidden relative shrink-0 text-[20px] text-ellipsis w-full whitespace-pre-wrap font-bold" style={{ color: '#fefefe', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                {title}
              </p>
              <div className="flex gap-[var(--space-quarter,4px)] h-[20px] items-center leading-[1.4] relative shrink-0 w-full" style={{ color: '#c0c6cd', fontSize: 'var(--font-size-0, 16px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                <p className="relative shrink-0">{startDate}</p>
                <p className="overflow-hidden relative shrink-0 text-ellipsis">-</p>
                <p className="flex-1 min-h-px min-w-px overflow-hidden relative text-ellipsis whitespace-nowrap">
                  {endDate}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[var(--space-eighth,2px)] items-start relative shrink-0 w-[1075px]">
              {eligibleAthletes.length > 0 && (
                <div className="flex gap-[var(--space-eighth,2px)] items-center relative shrink-0 w-full">
                  <p className="leading-[1.4] relative shrink-0 tracking-normal" style={{ color: '#c0c6cd', fontSize: 'var(--font-size-0, 16px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                    Eligible Athletes:
                  </p>
                  <div className="flex gap-[var(--space-eighth,2px)] items-center relative shrink-0">
                    {eligibleAthletes.map((athlete, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <span className="mx-1">,</span>}
                        <div className="flex gap-1 items-center">
                          <Check className="size-4" style={{ color: '#c0c6cd' }} />
                          <p className="leading-[1.4] relative shrink-0 tracking-normal" style={{ color: '#c0c6cd', fontSize: 'var(--font-size-0, 16px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                            {athlete}
                          </p>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
              {showAddAthlete && (
                <div className="flex gap-0 items-center relative shrink-0 w-full">
                  <div className="flex flex-col items-center justify-center relative shrink-0">
                    <p className="leading-[1.4] relative shrink-0 tracking-normal cursor-pointer hover:underline" style={{ color: '#0a93f5', fontSize: 'var(--font-size-0, 16px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                      Add or Connect Athlete
                    </p>
                    <div className="h-[1px] relative shrink-0 w-full bg-[#0a93f5] mt-[-1px]" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-[16px] items-center justify-end relative shrink-0">
            <div className="flex gap-[var(--space-half,8px)] items-start relative shrink-0">
              {isJoined ? (
                <div className="flex items-center justify-center relative self-stretch shrink-0">
                  <Check className="size-4" style={{ color: '#c0c6cd' }} />
                </div>
              ) : (
                <div className="flex items-center justify-center relative self-stretch shrink-0">
                  <Info className="size-4" style={{ color: '#c0c6cd' }} />
                </div>
              )}
              <div className="flex items-center justify-center relative shrink-0">
                <p className="leading-[1.4] relative shrink-0 tracking-normal" style={{ color: '#c0c6cd', fontSize: 'var(--font-size-0, 16px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                  {isJoined ? 'Your athlete has been added to the waitlist.' : 'This registration has reached capacity'}
                </p>
              </div>
            </div>
            <button
              onClick={isJoined ? onRemoveAthlete : onJoinWaitlist}
              className={`flex gap-[var(--space-half,8px)] items-center justify-center min-h-[40px] overflow-clip px-[var(--space-one,16px)] relative rounded-[var(--border-radius-large,4px)] shrink-0 transition-colors ${
                isJoined
                  ? 'bg-[#E0E1E1] cursor-pointer hover:bg-[#d0d1d1]'
                  : 'bg-[#0273e3] cursor-pointer hover:bg-[#0260c4]'
              }`}
            >
              <div className="flex gap-[var(--space-half,8px)] items-center justify-center leading-[0] relative shrink-0 whitespace-nowrap">
                <p className="leading-none" style={{ color: isJoined ? '#36485c' : '#fefefe', fontSize: 'var(--font-size-default, 16px)', fontFamily: 'var(--font-body, Barlow), sans-serif', fontWeight: 'bold' }}>
                  {isJoined ? 'Remove Athlete' : 'Join Waitlist'}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Registration() {
  const router = useRouter()
  const pathname = usePathname()
  
  const [joinedRegistrations, setJoinedRegistrations] = useState<Set<string>>(new Set())
  
  const handleRemoveAthlete = (title: string) => {
    const stored = localStorage.getItem('joinedRegistrations')
    if (stored) {
      try {
        const joinedSet = new Set(JSON.parse(stored) as string[])
        joinedSet.delete(title)
        localStorage.setItem('joinedRegistrations', JSON.stringify(Array.from(joinedSet)))
        setJoinedRegistrations(new Set(joinedSet))
      } catch (e) {
        // Handle error
      }
    }
  }

  useEffect(() => {
    const loadJoinedRegistrations = () => {
      const stored = localStorage.getItem('joinedRegistrations')
      if (stored) {
        try {
          const joinedSet = new Set(JSON.parse(stored) as string[])
          setJoinedRegistrations(joinedSet)
        } catch (e) {
          // Handle parse error
        }
      }
    }
    
    // Always check localStorage first
    loadJoinedRegistrations()
    
    // Check if we're coming from the complete page (has session flag)
    const fromCompletePage = sessionStorage.getItem('fromCompletePage')
    
    if (fromCompletePage) {
      // Coming from complete page - ensure we load the latest state
      sessionStorage.removeItem('fromCompletePage') // Clear the flag
      // Small delay to ensure localStorage is fully updated
      setTimeout(() => {
        loadJoinedRegistrations()
      }, 50)
    } else {
      // Check if this is a page refresh
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      const isPageRefresh = navigationEntry?.type === 'reload'
      
      if (isPageRefresh) {
        // Page refresh - clear joined state to reset
        localStorage.removeItem('joinedRegistrations')
        localStorage.removeItem('currentRegistration')
        setJoinedRegistrations(new Set())
      }
    }
    
    // Listen for storage changes and focus events
    const handleStorageChange = () => {
      loadJoinedRegistrations()
    }
    
    // Custom event listener for same-tab updates
    const handleCustomStorage = () => {
      loadJoinedRegistrations()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleStorageChange)
    window.addEventListener('localStorageUpdate', handleCustomStorage)
    
    // Also check on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadJoinedRegistrations()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleStorageChange)
      window.removeEventListener('localStorageUpdate', handleCustomStorage)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [pathname])

  return (
    <div className="bg-[var(--u-color-background-canvas,#191f24)] flex flex-col gap-0 isolate items-start overflow-clip relative rounded-[12px] min-h-screen w-full">
      <DesktopNavbar className="bg-white flex flex-col h-[48px] items-start shrink-0 sticky top-0 w-full z-[2]" isAuth />
      <div className="flex flex-col isolate items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full z-[1]">
        <div className="flex flex-col items-center relative shrink-0 w-full z-[1]">
          <div className="w-full flex justify-center">
            <ProfileBanner
              breakpoint="l"
              className="bg-gradient-to-b flex flex-col from-[rgba(11,33,57,0.9)] gap-0 isolate items-start max-w-[1919px] min-w-[1366px] overflow-clip px-[var(--space-one-and-half,24px)] py-[40px] relative shrink-0 to-[rgba(0,0,0,0)] w-[1512px]"
            />
          </div>
          <div className="flex flex-col gap-[var(--space-one-and-half,24px)] items-start max-w-[1128px] pb-[var(--space-one-and-half,24px)] relative shrink-0 w-full">
            <div className="flex flex-col gap-[var(--space-one,16px)] items-start max-w-[1365px] min-w-[768px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[var(--space-half,8px)] items-start relative shrink-0 w-full">
                <div className="flex flex-col justify-end leading-[0] relative shrink-0 w-full" style={{ color: '#fefefe', fontSize: 'var(--font-size-plus-five, 32px)', letterSpacing: 'var(--letter-spacing-more, 0.25px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif', fontWeight: 'bold' }}>
                  <p className="leading-[1.2] whitespace-pre-wrap">
                    Sporting Stripes & Stars Summer Camp | Summer 2025
                  </p>
                </div>
                <div className="flex gap-[var(--space-half,8px)] items-start leading-[1.4] relative shrink-0 w-full" style={{ color: 'var(--content-base-foreground-default, #c0c6cd)', fontSize: 'var(--font-size-0, 16px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                  <p className="relative shrink-0">Camp</p>
                  <p className="relative shrink-0">·</p>
                  <div className="flex gap-[var(--space-quarter,4px)] items-center relative shrink-0">
                    <p className="relative shrink-0">Sep 24, 2025</p>
                    <p className="relative shrink-0">-</p>
                    <p className="relative shrink-0">Nov 1, 2025</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[var(--space-eighth,2px)] items-start leading-[1.4] relative shrink-0 text-ellipsis tracking-normal w-full">
                <p className="min-w-full overflow-hidden relative shrink-0 w-[min-content] whitespace-pre-wrap" style={{ color: 'var(--content-base-foreground-default, #c0c6cd)', fontSize: '16px', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                  {`Kick off your summer with Sporting's Stripes & Stars Camp — a high-energy, multi-day experience built for young athletes who want to sharpen their skills, stay active, and have fun. Our camp offers age-based training sessions focused on fundamentals, team play, and confidence-building, all led by experienced coaches in a supportive environment. Each day includes a mix of drills, small-sided games, and team challenges to keep athletes engaged and growing. Whether your athlete is just getting started or preparing for competitive play, Stripes & Stars is a gr...`}
                </p>
                <p className="overflow-hidden relative shrink-0 font-bold cursor-pointer hover:underline" style={{ color: 'var(--u-color-base-foreground, #c0c6cd)', fontSize: '14px', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                  read more
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[var(--space-half,8px)] items-start justify-end relative shrink-0 w-full">
              <div className="flex flex-col items-start relative shrink-0 w-full">
                <div className="flex flex-col justify-center leading-[0] relative shrink-0 uppercase whitespace-nowrap font-bold" style={{ color: 'var(--content-strong-background-default, #c0c6cd)', fontSize: '10px', fontFamily: 'var(--font-body, helvetica), sans-serif', lineHeight: '1.2' }}>
                  <p className="leading-[1.2]">My Athletes</p>
                </div>
              </div>
              <div className="flex gap-[var(--space-quarter,4px)] items-center px-0 py-0 relative shrink-0 w-full">
                <div className="flex gap-0 items-center relative shrink-0">
                  <div className="relative shrink-0 size-[32px]">
                    <div className="bg-[#506277] border border-white border-solid flex items-center justify-center size-full rounded-full">
                      <span className="text-white text-xs font-bold tracking-[-0.558px]">JD</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0 items-center relative shrink-0">
                  <div className="relative shrink-0 size-[32px]">
                    <div className="bg-[#506277] border border-white border-solid flex items-center justify-center size-full rounded-full">
                      <span className="text-white text-lg font-bold">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[var(--space-two,0px)] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[var(--space-three-quarter,12px)] items-start relative shrink-0 w-full">
                <div className="flex items-center pb-[var(--space-quarter,4px)] relative shrink-0 w-full">
                  <div className="flex flex-col justify-center leading-[0] relative shrink-0 whitespace-nowrap font-bold" style={{ color: 'var(--content-base-foreground-default, #c0c6cd)', fontSize: 'var(--font-size-300, 18px)', fontFamily: 'var(--font-family-barlow, Barlow), sans-serif' }}>
                    <p className="leading-[1.4]">Registrations</p>
                  </div>
                </div>
                <RegistrationCard
                  price="$410"
                  title="Boys & Girls Stripes | Ages: 13-14 (Parent - Child)"
                  startDate="Sep 24, 2025"
                  endDate="Sep 28, 2025"
                  eligibleAthletes={["John Doe"]}
                  showAddAthlete={true}
                  onJoinWaitlist={() => {
                    localStorage.setItem('currentRegistration', "Boys & Girls Stripes | Ages: 13-14 (Parent - Child)")
                    router.push('/waitlist')
                  }}
                  onRemoveAthlete={() => handleRemoveAthlete("Boys & Girls Stripes | Ages: 13-14 (Parent - Child)")}
                  isJoined={joinedRegistrations.has("Boys & Girls Stripes | Ages: 13-14 (Parent - Child)")}
                />
                <RegistrationCard
                  price="$410"
                  title="Boys & Girls Stripes | Ages: 14-15 (Parent - Child)"
                  startDate="Sep 24, 2025"
                  endDate="Sep 28, 2025"
                  eligibleAthletes={["John Doe"]}
                  showAddAthlete={true}
                  onJoinWaitlist={() => {
                    localStorage.setItem('currentRegistration', "Boys & Girls Stripes | Ages: 14-15 (Parent - Child)")
                    router.push('/waitlist')
                  }}
                  onRemoveAthlete={() => handleRemoveAthlete("Boys & Girls Stripes | Ages: 14-15 (Parent - Child)")}
                  isJoined={joinedRegistrations.has("Boys & Girls Stripes | Ages: 14-15 (Parent - Child)")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
