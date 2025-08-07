import { type NextRequest, NextResponse } from "next/server"
import { mockData } from "@/lib/graphql-mock-data"
import { getAuthUser } from "@/lib/auth"
import type { Application } from "@/lib/types"

// Simulate a delay for network requests
const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function POST(req: NextRequest) {
  await simulateDelay(500) // Simulate network latency

  const { query, variables } = await req.json()
  const currentUser = await getAuthUser()

  // Allow 'opportunities', 'opportunity', 'login', and 'signup' queries without authentication
  // All other queries/mutations require authentication (and implicitly, student role)
  if (!currentUser && query !== "login" && query !== "signup" && query !== "opportunities" && query !== "opportunity") {
    return NextResponse.json({ errors: [{ message: "Authentication required" }] }, { status: 401 })
  }

  try {
    const result: any = {}

    switch (query) {
      // --- Queries ---
      case "opportunities":
        const { type, location, skills, experienceLevel, offset = 0, limit = 10 } = variables || {}
        let filteredOpportunities = mockData.opportunities

        if (type) {
          filteredOpportunities = filteredOpportunities.filter((opp) => opp.type === type)
        }
        if (location) {
          filteredOpportunities = filteredOpportunities.filter((opp) => opp.location === location)
        }
        if (skills && skills.length > 0) {
          const lowerCaseFilterSkills = skills.map((s: string) => s.toLowerCase())
          filteredOpportunities = filteredOpportunities.filter((opp) => {
            const lowerCaseOpportunitySkills = opp.requiredSkills.map((s) => s.toLowerCase())
            return lowerCaseFilterSkills.every((filterSkill: string) =>
              lowerCaseOpportunitySkills.includes(filterSkill),
            )
          })
        }
        if (experienceLevel) {
          filteredOpportunities = filteredOpportunities.filter((opp) => opp.experienceLevel === experienceLevel)
        }
        result.opportunities = filteredOpportunities.slice(offset, offset + limit)
        break

      case "opportunity":
        result.opportunity = mockData.opportunities.find((o) => o.id === variables.id)
        break

      case "user":
        if (!currentUser) {
          throw new Error("Authentication required to fetch user details.")
        }
        // Since only students exist, no need for role check or fetching other users
        const { password, ...userWithoutPassword } = currentUser
        result.user = userWithoutPassword
        break

      case "applications":
        // All authenticated users are students now
        if (!currentUser) {
          // Re-check authentication
          throw new Error("Authentication required to view applications.")
        }
        result.applications = mockData.applications.filter((app) => app.studentId === currentUser.id)
        break

      // Removed postedOpportunities and applicants queries

      // --- Mutations ---
      // Removed postOpportunity mutation

      case "applyToOpportunity":
        // All authenticated users are students now
        if (!currentUser) {
          // Re-check authentication
          throw new Error("Authentication required to apply.")
        }
        const existingApplication = mockData.applications.find(
          (app) => app.opportunityId === variables.opportunityId && app.studentId === currentUser.id,
        )
        if (existingApplication) {
          throw new Error("You have already applied to this opportunity.")
        }
        const newApplication: Application = {
          id: mockData.generateApplicationId(),
          studentId: currentUser.id,
          status: "PENDING",
          appliedAt: new Date().toISOString(),
          ...variables,
        }
        mockData.applications.push(newApplication)
        result.applyToOpportunity = newApplication
        break


      default:
        throw new Error(`Unknown query or mutation: ${query}`)
    }

    return NextResponse.json({ data: result })
  } catch (error: any) {
    console.error("GraphQL mock error:", error)
    return NextResponse.json({ errors: [{ message: error.message }] }, { status: 400 })
  }
}
