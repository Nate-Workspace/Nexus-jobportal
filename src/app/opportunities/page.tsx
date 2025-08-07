import OpportunitiesFiltersClient from "./OpportunitiesFilters.client"
import { OpportunitiesListClient } from "./OpportunitiesList.client"
import { graphqlClient } from "@/lib/graphql-client"
import type { Opportunity, OpportunityType, ExperienceLevel } from "@/lib/types"

interface OpportunitiesPageProps {
  searchParams: {
    type?: OpportunityType
    location?: "REMOTE" | "ONSITE" | "HYBRID"
    skills?: string
    experienceLevel?: ExperienceLevel
  }
}

export default async function OpportunitiesPage({ searchParams }: OpportunitiesPageProps) {
  // Your server-side initial data fetch, etc.
  const getFilterValue = (param: string | undefined, allValue = "ALL") =>
    param && param !== allValue ? param : undefined

  const currentType = getFilterValue(searchParams.type, "ALL") as OpportunityType | undefined
  const currentLocation = getFilterValue(searchParams.location, "ALL") as
    | "REMOTE"
    | "ONSITE"
    | "HYBRID"
    | undefined
  const currentExperienceLevel = getFilterValue(searchParams.experienceLevel, "ALL") as
    | ExperienceLevel
    | undefined
  const currentSkills = searchParams.skills
    ? searchParams.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  const initialOpportunitiesResponse = await graphqlClient<{ opportunities: Opportunity[] }>({
    query: "opportunities",
    variables: {
      type: currentType,
      location: currentLocation,
      skills: currentSkills,
      experienceLevel: currentExperienceLevel,
      offset: 0,
      limit: 10,
    },
  })

  const initialOpportunities = initialOpportunitiesResponse.data?.opportunities || []

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Explore Opportunities</h1>

      <OpportunitiesFiltersClient />

      <OpportunitiesListClient
        initialItems={initialOpportunities}
        type={currentType}
        location={currentLocation}
        skills={currentSkills}
        experienceLevel={currentExperienceLevel}
      />
    </div>
  )
}
