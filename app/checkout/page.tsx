"use client"

import React, { useState, Suspense } from "react"
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

const inputClass =
  "mt-1.5 h-10 w-full bg-[#21262b] border border-[#30363d] text-white placeholder:text-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#0273e3] rounded px-3 text-[16px]"

function CheckoutPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const programSlug = searchParams.get("program") ?? "sample-program"
  const programTitle = programSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  const athlete = searchParams.get("athlete") ?? ""
  const athleteName = athlete ? decodeURIComponent(athlete) : "John Doe"

  const [parentEmail, setParentEmail] = useState("")
  const [agree, setAgree] = useState(false)
  const [sending, setSending] = useState(false)

  const [nameOnCard, setNameOnCard] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiration, setExpiration] = useState("")
  const [cvc, setCvc] = useState("")
  const [country, setCountry] = useState("US")
  const [postalCode, setPostalCode] = useState("")

  const registrationTotal = 35.0
  const transactionFee = 1.47
  const total = registrationTotal + transactionFee
  const transactionId = "TXN-" + Math.random().toString(36).slice(2, 10).toUpperCase()

  const handleFinish = async () => {
    const email = parentEmail.trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email for the confirmation.")
      return
    }
    setSending(true)
    try {
      const base = typeof window !== "undefined" ? window.location.origin : ""
      const res = await fetch(`${base}/api/send-registration-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Registration confirmation",
          html: `<p>Your registration for ${programTitle} – ${athleteName} has been completed.</p>`,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        alert(data.error || "Failed to send confirmation email")
        return
      }
      alert("Registration complete. A confirmation email has been sent.")
    } finally {
      setSending(false)
    }
  }

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
              <h1 className="text-[32px] font-bold text-[#fefefe] leading-[1.2]">Checkout</h1>
              <section className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
                <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4 text-sm">
                  <p className="text-[#c0c6cd] mb-2">
                    {programTitle} – {athleteName}
                  </p>
                  <p className="text-[#8b949e] mb-4">{transactionId}</p>
                  <div className="border-t border-[#30363d] pt-4 space-y-2">
                    <div className="flex justify-between text-[#c0c6cd]">
                      <span>Registration Total</span>
                      <span>${registrationTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#c0c6cd]">
                      <span>Transaction Fee</span>
                      <span>${transactionFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-semibold pt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-white mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[#c0c6cd] text-sm">
                        Email for confirmation <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[#c0c6cd] text-sm">
                        Name on Card <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter name on card"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[#c0c6cd] text-sm">
                        Card Number <span className="text-red-400">*</span>
                      </label>
                      <div className="mt-1.5 flex gap-2">
                        <input
                          type="text"
                          placeholder="1234 1234 1234 1234"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className={`${inputClass} flex-1`}
                        />
                        <div className="flex items-center gap-1 shrink-0 text-[#8b949e] text-xs">
                          <span>Visa</span>
                          <span>MC</span>
                          <span>Amex</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#c0c6cd] text-sm">
                          Expiration <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={expiration}
                          onChange={(e) => setExpiration(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-[#c0c6cd] text-sm">
                          CVC <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="CVC"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#c0c6cd] text-sm">
                          Country <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className={inputClass}
                        >
                          <option value="US">United States</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[#c0c6cd] text-sm">
                          Postal Code <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Postal Code"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#30363d] bg-[#21262b] text-[#0273e3] focus:ring-[#0273e3] shrink-0"
                    />
                    <label htmlFor="agree" className="text-sm text-[#c0c6cd] leading-snug cursor-pointer">
                      By clicking &apos;I agree&apos; you acknowledge you have read and agree to be bound by the{" "}
                      <a href="#" className="text-[#58a6ff] hover:underline">
                        Hudl Registration Purchase Terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#58a6ff] hover:underline">
                        Hudl Privacy Policy
                      </a>
                      , including those additional terms and conditions referenced therein and/or available by hyperlink.
                    </label>
                  </div>
                </section>
            </div>
            </div>
          </div>
        </div>
      <div className="bg-[#0f1215] border-t border-[#42474c] border-solid flex items-center justify-between w-full overflow-clip px-[var(--space-one-and-half,24px)] py-[var(--space-one,16px)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.5),0px_0px_4px_0px_rgba(0,0,0,0.2)] shrink-0 sticky bottom-0 z-[10]">
        <div className="flex flex-1 items-center justify-between w-full min-h-px min-w-px relative">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-[#0f1215] border border-[#42474c] text-white hover:bg-[#1a1d22] min-h-[40px] px-[var(--space-one,16px)] rounded-[var(--border-radius-large,4px)] cursor-pointer transition-colors"
            style={{ fontFamily: "var(--font-body, Barlow), sans-serif", fontSize: "var(--font-size-default, 16px)", fontWeight: "bold" }}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => handleFinish()}
            disabled={sending}
            className="bg-[#0273e3] text-white hover:bg-[#0260c4] min-h-[40px] px-[var(--space-one,16px)] rounded-[var(--border-radius-large,4px)] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-body, Barlow), sans-serif", fontSize: "var(--font-size-default, 16px)", fontWeight: "bold" }}
          >
            {sending ? "Sending…" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--u-color-background-canvas,#191f24)] flex items-center justify-center text-white">Loading…</div>}>
      <CheckoutPageContent />
    </Suspense>
  )
}
