"use server"

import { graphqlClient } from "@/lib/graphql-client"
import type { Opportunity, OpportunityType, ExperienceLevel } from "@/lib/types"

interface FetchOpportunitiesParams {
  type?: OpportunityType
  location?: "REMOTE" | "ONSITE" | "HYBRID"
  skills?: string[]
  experienceLevel?: ExperienceLevel // Added
  offset: number
  limit: number
}

export async function fetchMoreOpportunities(params: FetchOpportunitiesParams): Promise<Opportunity[]> {
  const { type, location, skills, experienceLevel, offset, limit } = params // Added experienceLevel
  const moreOpportunitiesResponse = await graphqlClient<{ opportunities: Opportunity[] }>({
    query: "opportunities",
    variables: {
      type,
      location,
      skills,
      experienceLevel, // Passed to GraphQL client
      offset,
      limit,
    },
  })
  return moreOpportunitiesResponse.data?.opportunities || []
}
