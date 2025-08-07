import { NextRequest, NextResponse } from "next/server"
import { fetchMoreOpportunities } from "@/lib/actions"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      type,
      location,
      skills,
      experienceLevel,
      offset,
      limit,
    } = body

    const opportunities = await fetchMoreOpportunities({
      type,
      location,
      skills,
      experienceLevel,
      offset,
      limit,
    })

    return NextResponse.json({ opportunities })
  } catch (error) {
    console.error("Error fetching more opportunities:", error)
    return NextResponse.json(
      { error: "Failed to fetch more opportunities." },
      { status: 500 }
    )
  }
}
