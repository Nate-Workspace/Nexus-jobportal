"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Application, Opportunity, ApplicationStatus } from "@/lib/types"

interface ApplicationCardProps {
  application: Application
  opportunity?: Opportunity
}

export function ApplicationCard({ application, opportunity }: ApplicationCardProps) {


  const getStatusVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "PENDING":
        return "secondary"
      case "ACCEPTED":
        return "default"
      case "REJECTED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">
          {/* Simplified title link as no professor view */}
          <Link href={`/opportunities/${application.opportunityId}`} className="hover:underline">
            {opportunity?.title || "Opportunity Title"}
          </Link>
        </CardTitle>
        <CardDescription>
          <span>Applied on: {new Date(application.appliedAt).toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{application.message}</p>
        <p className="text-sm">
          CV/Resume:{" "}
          <a
            href={application.cvResumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View CV
          </a>
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Badge variant={getStatusVariant(application.status)}>{application.status}</Badge>
      </CardFooter>
    </Card>
  )
}
