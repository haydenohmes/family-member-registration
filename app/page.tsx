import { redirect } from "next/navigation"

export default function Home() {
  redirect("/registration")
  return null
}

