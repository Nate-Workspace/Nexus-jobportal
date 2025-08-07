'use client'

import * as React from 'react'
import { InfiniteScrollList } from '@/components/infinite-scroll-list'
import type { Opportunity, OpportunityType, ExperienceLevel } from '@/lib/types'

interface OpportunitiesListClientProps {
  initialItems: Opportunity[]
  type?: OpportunityType
  location?: "REMOTE" | "ONSITE" | "HYBRID"
  skills?: string[]
  experienceLevel?: ExperienceLevel
}

export function OpportunitiesListClient({
  initialItems,
  type,
  location,
  skills,
  experienceLevel,
}: OpportunitiesListClientProps) {

  const fetchMore = async (offset: number, limit: number) => {
    const res = await fetch('/api/opportunities/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        location,
        skills,
        experienceLevel,
        offset,
        limit,
      }),
    })

    if (!res.ok) throw new Error('Failed to fetch more opportunities')

    const data = await res.json()
    return data.opportunities as Opportunity[]
  }

  return (
    <InfiniteScrollList
      initialItems={initialItems}
      fetchMore={fetchMore}
    />
  )
}
