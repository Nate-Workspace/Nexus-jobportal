"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function OpportunitiesFiltersClient() {
  // You can optionally lift this state up or use URLSearchParams for controlled filters
  // Or you can keep this simple and just update the URL (like you do now):

  return (
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
          value={new URLSearchParams(window.location.search).get("type") || "ALL"}
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
          value={new URLSearchParams(window.location.search).get("location") || "ALL"}
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
      <div className="grid gap-2">
        <Label htmlFor="filter-experience-level">Experience Level</Label>
        <Select
          onValueChange={(value) => {
            const newSearchParams = new URLSearchParams(window.location.search)
            if (value && value !== "ALL") newSearchParams.set("experienceLevel", value)
            else newSearchParams.delete("experienceLevel")
            window.location.search = newSearchParams.toString()
          }}
          value={new URLSearchParams(window.location.search).get("experienceLevel") || "ALL"}
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
          defaultValue={new URLSearchParams(window.location.search).get("skills") || ""}
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
  )
}
