"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Opportunity } from "@/lib/types"
import { MapPin, CalendarDays, FlaskConical, Briefcase, TrendingUp } from "lucide-react" // Added TrendingUp icon

interface OpportunityCardProps {
  opportunity: Opportunity
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Link href={`/opportunities/${opportunity.id}`} passHref>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl">{opportunity.title}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            {opportunity.type === "RESEARCH" ? <FlaskConical className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
            {opportunity.type}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 text-sm text-muted-foreground">
          <p className="line-clamp-3 mb-2">{opportunity.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4" />
            <span>{opportunity.duration}</span>
          </div>
          {/* New: Display Experience Level */}
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>{opportunity.experienceLevel.replace(/_/g, " ")}</span> {/* Format for display */}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          {opportunity.requiredSkills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
          <Badge variant="outline" className="ml-auto">
            Deadline: {opportunity.deadline}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
