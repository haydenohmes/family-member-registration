import { NextResponse } from "next/server"

// In-memory store for prototype (resets on server restart)
const waitlistEntries: Array<{
  id: string
  athleteName: string
  programName: string
  email: string
  dateAdded: string
}> = []

let idCounter = 0
function nextId() {
  idCounter += 1
  return `wl-${Date.now()}-${idCounter}`
}

function corsHeaders(origin: string | null) {
  const allow = origin && /^https?:\/\/localhost(:\d+)?$/.test(origin) ? origin : "*"
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders("*") })
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin")
  return NextResponse.json(waitlistEntries, {
    headers: corsHeaders(origin),
  })
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  try {
    const body = (await request.json()) as {
      athleteName?: string
      programName?: string
      email?: string
    }
    const athleteName = typeof body.athleteName === "string" ? body.athleteName.trim() : ""
    const programName = typeof body.programName === "string" ? body.programName.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    if (!athleteName || !programName) {
      return NextResponse.json(
        { error: "athleteName and programName required" },
        { status: 400, headers: corsHeaders(origin) }
      )
    }
    const entry = {
      id: nextId(),
      athleteName,
      programName,
      email,
      dateAdded: new Date().toISOString().slice(0, 10),
    }
    waitlistEntries.push(entry)
    return NextResponse.json(entry, { status: 201, headers: corsHeaders(origin) })
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers: corsHeaders(origin) }
    )
  }
}
