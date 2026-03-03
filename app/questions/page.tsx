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

type TextFieldProps = {
  label: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
}

function TextField({ label, placeholder = "Placeholder", required = true, value, onChange }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-[var(--space-quarter,4px)] items-start relative w-full">
      <div className="flex gap-[var(--space-eighth,2px)] items-start leading-none relative shrink-0 w-full">
        <p className="relative shrink-0" style={{ color: '#c0c6cd', fontFamily: 'var(--font-body, Barlow), sans-serif', fontSize: 'var(--font-size-default, 16px)' }}>
          {label}
        </p>
        {required && (
          <p className="relative shrink-0" style={{ color: '#bb1700', fontFamily: 'var(--font-body, Barlow), sans-serif', fontSize: 'var(--font-size-default, 16px)' }}>
            *
          </p>
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#fefefe] border border-[#c4c6c8] border-solid flex items-center min-h-[40px] overflow-clip px-[var(--space-one,16px)] py-0 relative rounded-[2px] shrink-0 w-full text-[16px] outline-none focus:border-[#0273e3]"
        style={{ color: '#36485c', fontFamily: 'var(--font-body, Barlow), sans-serif' }}
      />
    </div>
  )
}

function EmailField({
  label,
  value,
  onChange,
  required = true,
  helpText,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  helpText?: string
}) {
  return (
    <div className="flex flex-col gap-[var(--space-quarter,4px)] items-start relative w-full">
      <div className="flex gap-[var(--space-eighth,2px)] items-start leading-none relative shrink-0 w-full">
        <p className="relative shrink-0" style={{ color: '#c0c6cd', fontFamily: 'var(--font-body, Barlow), sans-serif', fontSize: 'var(--font-size-default, 16px)' }}>
          {label}
        </p>
        {required && (
          <p className="relative shrink-0" style={{ color: '#bb1700', fontFamily: 'var(--font-body, Barlow), sans-serif', fontSize: 'var(--font-size-default, 16px)' }}>
            *
          </p>
        )}
      </div>
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="you@example.com"
        className="bg-[#fefefe] border border-[#c4c6c8] border-solid flex items-center min-h-[40px] overflow-clip px-[var(--space-one,16px)] py-0 relative rounded-[2px] shrink-0 w-full text-[16px] outline-none focus:border-[#0273e3]"
        style={{ color: '#36485c', fontFamily: 'var(--font-body, Barlow), sans-serif' }}
      />
      {helpText && (
        <div className="flex gap-0 items-center justify-center relative shrink-0 w-full">
          <div className="flex flex-1 flex-col justify-center leading-[0] min-h-px min-w-px relative">
            <p className="leading-[1.4] whitespace-pre-wrap text-[12px]" style={{ color: '#506277', fontFamily: 'var(--font-body, Barlow), sans-serif' }}>
              {helpText}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function QuestionsPage() {
  const router = useRouter()
  const [confirmationEmail, setConfirmationEmail] = useState("")
  const [preferredPosition, setPreferredPosition] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [previousTeam, setPreviousTeam] = useState("")
  const [jerseyNumber, setJerseyNumber] = useState("")

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
            <div className="flex flex-col gap-[var(--space-half,8px)] items-start max-w-[1365px] min-w-[768px] pb-[var(--space-one,16px)] pt-[var(--space-one-and-half,24px)] relative shrink-0 w-full">
              <div className="flex flex-col gap-[var(--space-one,16px)] items-start relative shrink-0 w-full">
                <div className="flex flex-col justify-end leading-[0] relative shrink-0 w-full" style={{ color: '#fefefe', fontSize: 'var(--font-size-plus-five, 32px)', letterSpacing: 'var(--letter-spacing-more, 0.25px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif', fontWeight: 'bold' }}>
                  <p className="leading-[1.2] whitespace-pre-wrap">Questions</p>
                </div>
              </div>
              <div className="flex flex-col justify-center leading-[0] relative shrink-0 w-full" style={{ color: '#c0c6cd', fontSize: 'var(--font-size-0, 16px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                <p className="leading-[1.4] whitespace-pre-wrap">Answer the following questions to complete registration for this program.</p>
              </div>
            </div>
            <div className="flex flex-col gap-[var(--space-two,32px)] items-start max-w-[528px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[var(--space-one-and-quarter,20px)] items-start relative shrink-0 w-full">
                <div className="flex flex-col gap-[var(--size-small,4px)] items-start tracking-normal w-full" style={{ color: '#c0c6cd', fontSize: 'var(--font-size-plus-one, 18px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif', fontWeight: 'bold' }}>
                  <p className="leading-[1.4] whitespace-pre-wrap">Contact Email</p>
                </div>
                <p className="leading-[1.4] relative shrink-0" style={{ color: '#85909e', fontSize: 'var(--font-size-minus-one, 14px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif' }}>
                  We’ll send your waitlist confirmation to this address.
                </p>
                <EmailField
                  label="Parent or guardian email"
                  value={confirmationEmail}
                  onChange={setConfirmationEmail}
                  required
                  helpText="You’ll receive an email when a spot opens up."
                />
              </div>
              <div className="flex flex-col gap-[var(--space-one-and-quarter,20px)] items-start relative shrink-0 w-full">
                <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 w-[min-content]" style={{ color: '#c0c6cd', fontSize: 'var(--font-size-plus-one, 18px)', fontFamily: 'var(--u-font-body, Barlow), sans-serif', fontWeight: 'bold' }}>
                  <p className="leading-[1.4] whitespace-pre-wrap">Athlete Information</p>
                </div>
                <div className="flex flex-col gap-[var(--space-one-and-quarter,20px)] items-start overflow-clip relative shrink-0 w-full">
                  <TextField
                    label="Preferred Position"
                    placeholder="e.g., Forward, Midfielder, Defender, Goalkeeper"
                    required
                    value={preferredPosition}
                    onChange={setPreferredPosition}
                  />
                  <TextField
                    label="Years of Soccer Experience"
                    placeholder="e.g., 3 years"
                    required
                    value={yearsExperience}
                    onChange={setYearsExperience}
                  />
                  <TextField
                    label="Previous Team or Club"
                    placeholder="e.g., Local Youth League"
                    required={false}
                    value={previousTeam}
                    onChange={setPreviousTeam}
                  />
                  <TextField
                    label="Jersey Number Preference"
                    placeholder="e.g., 7, 10, 23"
                    required={false}
                    value={jerseyNumber}
                    onChange={setJerseyNumber}
                  />
                </div>
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
            onClick={() => {
              const trimmed = confirmationEmail.trim()
              if (!trimmed) return
              if (!EMAIL_REGEX.test(trimmed)) return
              sessionStorage.setItem("waitlistConfirmationEmail", trimmed)
              router.push("/complete")
            }}
            disabled={!confirmationEmail.trim() || !EMAIL_REGEX.test(confirmationEmail.trim())}
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

