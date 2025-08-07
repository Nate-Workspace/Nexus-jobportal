import { graphqlClient } from "@/lib/graphql-client"
import type { Opportunity } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, CalendarDays, FlaskConical, Briefcase } from "lucide-react"
import { notFound } from "next/navigation" 

interface OpportunityDetailsPageProps {
  params: {
    id: string
  }
}

export default async function OpportunityDetailsPage({ params }: OpportunityDetailsPageProps) {
  const { id } = params


  let opportunity: Opportunity | null | undefined = null
  try {
    const opportunityResponse = await graphqlClient<{ opportunity: Opportunity }>({
      query: "opportunity",
      variables: { id },
    })
    opportunity = opportunityResponse.data?.opportunity
  } catch (error) {
    console.error("Error fetching opportunity details:", error)
    notFound()
  }

  if (!opportunity) {
    notFound() 
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{opportunity.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-lg">
            {opportunity.type === "RESEARCH" ? <FlaskConical className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
            {opportunity.type}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <span>{opportunity.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Deadline: {opportunity.deadline}</span>
            </div>
          </div>

          <p className="text-lg leading-relaxed">{opportunity.description}</p>

          <div>
            <h3 className="text-xl font-semibold mb-2">Required Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {opportunity.requiredSkills.map((skill, index) => (
                <Badge key={index} className="text-base px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
