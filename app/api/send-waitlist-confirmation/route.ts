import { NextResponse } from "next/server"
import { Resend } from "resend"
import nodemailer from "nodemailer"

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(request: Request) {
  try {
    let body: { to?: string; athleteName?: string; programName?: string }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    const { athleteName, programName } = body

    const recipientEmail = typeof body.to === "string" ? body.to.trim() : ""
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!recipientEmail || !validEmailRegex.test(recipientEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    const athlete = athleteName || "Your athlete"
    const program = programName || "this program"

    const testRedirect = process.env.WAITLIST_EMAIL_TEST_REDIRECT?.trim()
    const sendTo = testRedirect ? testRedirect : recipientEmail

    const subject = "You're on the waitlist – Sporting Youth Soccer"
    const html = `
      <h2>You're on the waitlist</h2>
      <p>Congratulations! <strong>${escapeHtml(athlete)}</strong> has been successfully added to the waitlist for <strong>${escapeHtml(program)}</strong>.</p>
      <p>If a spot opens up, you will receive an email with instructions to complete registration and pay.</p>
      ${testRedirect ? `<p style="color:#85909e;font-size:12px;margin-top:24px;">[Test mode] Original recipient: ${escapeHtml(recipientEmail)}</p>` : ""}
      <p>Thanks,<br/>Sporting Youth Soccer</p>
    `

    // Option 1: Gmail (no domain verification — testers get the email in their inbox)
    const gmailUser = process.env.GMAIL_USER?.trim()
    const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD ?? "").trim().replace(/\s/g, "")
    if (gmailUser && gmailAppPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailAppPassword },
      })
      await transporter.sendMail({
        from: `"Sporting Youth Soccer" <${gmailUser}>`,
        to: sendTo,
        subject,
        html,
      })
      return NextResponse.json({ success: true })
    }

    // Option 2: Resend (requires verified domain to send to any recipient)
    const apiKey = process.env.RESEND_API_KEY?.trim()
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email not configured. Set GMAIL_USER + GMAIL_APP_PASSWORD (no domain needed) or RESEND_API_KEY + verified domain." },
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
      html,
    })

    if (error) {
      const err = error as { message?: string }
      const message = err?.message ?? (typeof error === "string" ? error : "Email service error")
      console.error("Resend error:", error)
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("Send waitlist confirmation error:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send email" },
      { status: 500 }
    )
  }
}
