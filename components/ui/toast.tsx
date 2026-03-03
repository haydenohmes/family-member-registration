"use client"

import React, { useEffect, useState } from "react"

const TOAST_EVENT = "app-toast"

export function toast(message: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: { message } }))
  }
}

export function Toaster() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([])

  useEffect(() => {
    let id = 0
    const handleToast = (e: CustomEvent<{ message: string }>) => {
      const message = e.detail?.message ?? "Email has been sent."
      setToasts((prev) => [...prev, { id: ++id, message }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    }
    window.addEventListener(TOAST_EVENT, handleToast as EventListener)
    return () => window.removeEventListener(TOAST_EVENT, handleToast as EventListener)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-in fade-in slide-in-from-bottom-2 rounded-lg border border-[#42474c] bg-[#21262b] px-4 py-3 text-sm text-[#fefefe] shadow-lg"
          role="status"
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
