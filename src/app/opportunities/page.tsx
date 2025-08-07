
import { OpportunityCard } from "@/components/opportunity-card"
import { InfiniteScrollList } from "@/components/infinite-scroll-list"
import { graphqlClient } from "@/lib/graphql-client"
import type { Opportunity, OpportunityType, ExperienceLevel } from "@/lib/types" // Added ExperienceLevel
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { fetchMoreOpportunities as serverFetchMoreOpportunities } from "@/lib/actions"

interface OpportunitiesPageProps {
  searchParams: {
    type?: OpportunityType
    location?: "REMOTE" | "ONSITE" | "HYBRID"
    skills?: string
    experienceLevel?: ExperienceLevel // New search param
  }
}

export default async function OpportunitiesPage({ searchParams }: OpportunitiesPageProps) {
  // Helper to get filter value or undefined if "ALL"
  const getFilterValue = (param: string | undefined, allValue = "ALL") => {
    return param && param !== allValue ? param : undefined
  }

  const currentType = getFilterValue(searchParams.type, "ALL") as OpportunityType | undefined
  const currentLocation = getFilterValue(searchParams.location, "ALL") as "REMOTE" | "ONSITE" | "HYBRID" | undefined
  const currentExperienceLevel = getFilterValue(searchParams.experienceLevel, "ALL") as ExperienceLevel | undefined // New
  const currentSkills = searchParams.skills
    ? searchParams.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  // Initial fetch on the server
  const initialOpportunitiesResponse = await graphqlClient<{ opportunities: Opportunity[] }>({
    query: "opportunities",
    variables: {
      type: currentType,
      location: currentLocation,
      skills: currentSkills,
      experienceLevel: currentExperienceLevel, // Passed to GraphQL client
      offset: 0,
      limit: 10,
    },
  })

  const initialOpportunities = initialOpportunitiesResponse.data?.opportunities || []

  // Client-side function to pass to InfiniteScrollList
  // This function captures the current searchParams
  const clientFetchMoreOpportunities = async (offset: number, limit: number) => {
    return serverFetchMoreOpportunities({
      type: currentType,
      location: currentLocation,
      skills: currentSkills,
      experienceLevel: currentExperienceLevel, // Passed to Server Action
      offset,
      limit,
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Explore Opportunities</h1>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/20">
        <div className="grid gap-2">
          <Label htmlFor="filter-type">Type</Label>
          <Select
            onValueChange={(value) => {
              const newSearchParams = new URLSearchParams(window.location.search)
              if (value && value !== "ALL") newSearchParams.set("type", value)
              else newSearchParams.delete("type")
              window.location.search = newSearchParams.toString()
            }}
            value={searchParams.type || "ALL"}
          >
            <SelectTrigger id="filter-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="INTERNSHIP">Internship</SelectItem>
              <SelectItem value="RESEARCH">Research</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="filter-location">Location</Label>
          <Select
            onValueChange={(value) => {
              const newSearchParams = new URLSearchParams(window.location.search)
              if (value && value !== "ALL") newSearchParams.set("location", value)
              else newSearchParams.delete("location")
              window.location.search = newSearchParams.toString()
            }}
            value={searchParams.location || "ALL"}
          >
            <SelectTrigger id="filter-location">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Locations</SelectItem>
              <SelectItem value="REMOTE">Remote</SelectItem>
              <SelectItem value="ONSITE">Onsite</SelectItem>
              <SelectItem value="HYBRID">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* New Experience Level Filter */}
        <div className="grid gap-2">
          <Label htmlFor="filter-experience-level">Experience Level</Label>
          <Select
            onValueChange={(value) => {
              const newSearchParams = new URLSearchParams(window.location.search)
              if (value && value !== "ALL") newSearchParams.set("experienceLevel", value)
              else newSearchParams.delete("experienceLevel")
              window.location.search = newSearchParams.toString()
            }}
            value={searchParams.experienceLevel || "ALL"}
          >
            <SelectTrigger id="filter-experience-level">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Levels</SelectItem>
              <SelectItem value="ENTRY_LEVEL">Entry-Level</SelectItem>
              <SelectItem value="MID_LEVEL">Mid-Level</SelectItem>
              <SelectItem value="SENIOR">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="filter-skills">Skills (comma-separated)</Label>
          <Input
            id="filter-skills"
            placeholder="e.g., Python, React"
            defaultValue={searchParams.skills || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const newSearchParams = new URLSearchParams(window.location.search)
                const value = (e.target as HTMLInputElement).value
                if (value) newSearchParams.set("skills", value)
                else newSearchParams.delete("skills")
                window.location.search = newSearchParams.toString()
              }
            }}
          />
        </div>
      </div>

      <InfiniteScrollList
        initialItems={initialOpportunities}
        fetchMore={clientFetchMoreOpportunities}
        renderItem={(opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} />}
      />
    </div>
  )
}
