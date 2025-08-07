import { getAuthUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { graphqlClient } from "@/lib/graphql-client"
import type { Application, Opportunity } from "@/lib/types" // Removed User type
import { ApplicationCard } from "@/components/application-card"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await getAuthUser()

  if (!user) {
    redirect("/login?message=Please log in to view your dashboard.")
  }


  const applicationsResponse = await graphqlClient<{ applications: Application[] }>({
    query: "applications",
  })
  const applications = applicationsResponse.data?.applications || []


  const opportunitiesMap = new Map<string, Opportunity>()
  for (const app of applications) {
    if (!opportunitiesMap.has(app.opportunityId)) {
      const oppResponse = await graphqlClient<{ opportunity: Opportunity }>({
        query: "opportunity",
        variables: { id: app.opportunityId },
      })
      if (oppResponse.data?.opportunity) {
        opportunitiesMap.set(app.opportunityId, oppResponse.data.opportunity)
      }
    }
  }

  return (
    <div className="py-8">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">My Applications</h2>
        {applications.length === 0 ? (
          <p className="text-muted-foreground">
            You haven&apps;t applied to any opportunities yet.{" "}
            <Link href="/opportunities" className="text-primary hover:underline">
              Browse opportunities
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} opportunity={opportunitiesMap.get(app.opportunityId)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
