export type UserRole = "STUDENT" 
export type OpportunityType = "RESEARCH" | "INTERNSHIP"
export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED"
export type ExperienceLevel = "ENTRY_LEVEL" | "MID_LEVEL" | "SENIOR"

export interface User {
  id: string
  email: string
  password?: string 
  role: UserRole 
}

export interface Opportunity {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  duration: string
  location: "REMOTE" | "ONSITE" | "HYBRID"
  deadline: string 
  type: OpportunityType
  postedBy: string 
  experienceLevel: ExperienceLevel
}

export interface Application {
  id: string
  opportunityId: string
  studentId: string
  cvResumeUrl: string
  message: string
  status: ApplicationStatus
  appliedAt: string 
}

export interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

export interface QueryResult {
  opportunities?: Opportunity[]
  opportunity?: Opportunity
  user?: User
  applications?: Application[]
}

export interface MutationResult {
  login?: { user: User; token: string }
  signup?: { user: User; token: string }
  // Removed postOpportunity and updateApplicationStatus
  applyToOpportunity?: Application
}

export interface GraphQLRequest {
  query: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>
}
