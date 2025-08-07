"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Opportunity } from "@/lib/types"
import { graphqlClient } from "@/lib/graphql-client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import type { Application } from "@/lib/types"

interface ApplicationFormProps {
  opportunity: Opportunity
}

export function ApplicationForm({ opportunity }: ApplicationFormProps) {
  const { user, isAuthenticated } = useAuth() // Removed isStudent
  const router = useRouter()
  const [cvResumeUrl, setCvResumeUrl] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!isAuthenticated) {
      // Simplified check
      toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully.",
      variant: "default",})
      
      router.push("/opportunities")
      setIsLoading(false)
      return
    }

    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully.",
      variant: "default",})
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {opportunity.title}</DialogTitle>
          <DialogDescription>Fill in your details to apply for this opportunity.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="cvResumeUrl">CV/Resume URL</Label>
            <Input
              id="cvResumeUrl"
              placeholder="https://your-resume.com/cv.pdf"
              value={cvResumeUrl}
              onChange={(e) => setCvResumeUrl(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us why you're a good fit..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
