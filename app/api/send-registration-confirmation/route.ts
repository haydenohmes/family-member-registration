import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    let body: { to?: string; subject?: string; html?: string }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const recipientEmail = typeof body.to === "string" ? body.to.trim() : ""
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!recipientEmail || !validEmailRegex.test(recipientEmail)) {
      return NextResponse.json(
        { error: "Valid recipient email required" },
        { status: 400 }
      )
    }

    const subject =
      typeof body.subject === "string" && body.subject.trim()
        ? body.subject.trim()
        : "Registration confirmation"
    const html =
      typeof body.html === "string" && body.html.trim()
        ? body.html.trim()
        : "<p>Your registration has been completed.</p>"

    const testRedirect = process.env.WAITLIST_EMAIL_TEST_REDIRECT?.trim()
    const sendTo = testRedirect ? testRedirect : recipientEmail

    // Option 1: Gmail
    const gmailUser = process.env.GMAIL_USER?.trim()
    const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD ?? "").trim().replace(/\s/g, "").replace(/^["']|["']$/g, "")
    if (gmailUser && gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailAppPassword },
        })
        await transporter.sendMail({
          from: `"Sporting Youth Soccer" <${gmailUser}>`,
          to: sendTo,
          subject,
          html: testRedirect
            ? html + `<p style="color:#85909e;font-size:12px;margin-top:24px;">[Test] Original: ${recipientEmail}</p>`
            : html,
        })
        return NextResponse.json({ success: true })
      } catch (gmailErr) {
        const msg = gmailErr instanceof Error ? gmailErr.message : String(gmailErr)
        console.error("Gmail send error:", gmailErr)
        return NextResponse.json(
          { error: `Gmail failed: ${msg}` },
          { status: 500 }
        )
      }
    }

    // Option 2: Resend
    const apiKey = process.env.RESEND_API_KEY?.trim()
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Email not configured. Set GMAIL_USER + GMAIL_APP_PASSWORD or RESEND_API_KEY in .env.local.",
        },
        { status: 503 }
      )
    }

    const fromAddress =
      process.env.RESEND_FROM_EMAIL?.trim() ||
      "Sporting Youth Soccer <onboarding@resend.dev>"

    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [sendTo],
      subject,
      html: testRedirect
        ? html + `<p style="color:#85909e;font-size:12px;margin-top:24px;">[Test] Original: ${recipientEmail}</p>`
        : html,
    })

    if (error) {
      const err = error as { message?: string }
      const message = err?.message ?? (typeof error === "string" ? error : "Email service error")
      console.error("Resend error:", error)
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("Send registration confirmation error:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send email" },
      { status: 500 }
    )
  }
}
