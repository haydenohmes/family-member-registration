import type React from "react"
import type { Metadata } from "next"
import { Barlow, Teko } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toast"
// Import only the design tokens - skip index.css (has global reset) and uniform-design-system.css (remote import)
import "@adam-porter/shared-uniform-styles/src/uniform-design-tokens.css"
import "./globals.css"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const teko = Teko({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Family Member Registration",
  description: "Sporting Youth Soccer - Family Member Registration",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${barlow.className}`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

