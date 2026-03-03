import { NextResponse } from "next/server"
import { Resend } from "resend"
import nodemailer from "nodemailer"

function cors(origin: string | null) {
  const allow =
    origin && /^https?:\/\/localhost(:\d+)?$/.test(origin) ? origin : "*"
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors("*") })
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  try {
    let body: {
      to?: string | string[]
      subject?: string
      html?: string
      text?: string
    }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400, headers: cors(origin) }
      )
    }

    const toRaw = body.to
    const toList: string[] = Array.isArray(toRaw)
      ? toRaw.map((e) => (typeof e === "string" ? e.trim() : "")).filter(Boolean)
      : typeof toRaw === "string"
        ? [toRaw.trim()].filter(Boolean)
        : []
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const recipients = toList.filter((e) => validEmailRegex.test(e))
    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "At least one valid recipient email required" },
        { status: 400, headers: cors(origin) }
      )
    }

    const subject =
      typeof body.subject === "string" && body.subject.trim()
        ? body.subject.trim()
        : "You're off the waitlist!"
    const html =
      typeof body.html === "string" && body.html.trim()
        ? body.html.trim()
        : typeof body.text === "string" && body.text.trim()
          ? body.text
              .trim()
              .split("\n")
              .map((line) => `<p>${line.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`)
              .join("")
          : "<p>You're off the waitlist and invited to register.</p>"

    const testRedirect = process.env.WAITLIST_EMAIL_TEST_REDIRECT?.trim()
    const sendTo = testRedirect ? [testRedirect] : recipients

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
        html: testRedirect
          ? html +
            `<p style="color:#85909e;font-size:12px;margin-top:24px;">[Test] Original recipients: ${recipients.join(", ")}</p>`
          : html,
      })
      return NextResponse.json(
        { success: true, count: recipients.length },
        { headers: cors(origin) }
      )
    }

    const apiKey = process.env.RESEND_API_KEY?.trim()
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Email not configured. Set GMAIL_USER + GMAIL_APP_PASSWORD or RESEND_API_KEY.",
        },
        { status: 503, headers: cors(origin) }
      )
    }

    const fromAddress =
      process.env.RESEND_FROM_EMAIL?.trim() ||
      "Sporting Youth Soccer <onboarding@resend.dev>"
    const resend = new Resend(apiKey)
    const htmlToSend = testRedirect
      ? html +
        `<p style="color:#85909e;font-size:12px;margin-top:24px;">[Test] Original recipients: ${recipients.join(", ")}</p>`
      : html

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: sendTo,
      subject,
      html: htmlToSend,
    })

    if (error) {
      const message =
        (error as { message?: string })?.message ??
        (typeof error === "string" ? error : "Email service error")
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: message },
        { status: 500, headers: cors(origin) }
      )
    }

    return NextResponse.json(
      { success: true, id: data?.id, count: recipients.length },
      { headers: cors(origin) }
    )
  } catch (err) {
    console.error("Send invite off waitlist error:", err)
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to send email",
      },
      { status: 500, headers: cors(origin) }
    )
  }
}
