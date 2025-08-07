import type { User, Opportunity, Application } from "./types"

let nextUserId = 1
let nextOpportunityId = 1
let nextApplicationId = 1

const users: User[] = [
  { id: `user-${nextUserId++}`, email: "student@example.com", password: "password", role: "STUDENT" },
]

const opportunities: Opportunity[] = [
  {
    id: `opp-${nextOpportunityId++}`,
    title: "AI Research Assistant",
    description: "Join our team to work on cutting-edge AI research in natural language processing.",
    requiredSkills: ["Python", "Machine Learning", "NLP", "PyTorch"],
    duration: "6 months",
    location: "REMOTE",
    deadline: "2025-09-01",
    type: "RESEARCH",
    postedBy: users[0].id, 
    experienceLevel: "SENIOR",
  },
  {
    id: `opp-${nextOpportunityId++}`,
    title: "Software Engineering Intern",
    description: "Develop and maintain web applications using modern frameworks.",
    requiredSkills: ["JavaScript", "React", "Node.js", "SQL"],
    duration: "3 months",
    location: "ONSITE",
    deadline: "2025-08-15",
    type: "INTERNSHIP",
    postedBy: users[0].id, 
    experienceLevel: "ENTRY_LEVEL",
  },
  {
    id: `opp-${nextOpportunityId++}`,
    title: "Data Science Intern",
    description: "Analyze large datasets to extract insights and build predictive models.",
    requiredSkills: ["Python", "R", "Statistics", "SQL"],
    duration: "4 months",
    location: "HYBRID",
    deadline: "2025-09-30",
    type: "INTERNSHIP",
    postedBy: users[0].id, 
    experienceLevel: "MID_LEVEL",
  },
  {
    id: `opp-${nextOpportunityId++}`,
    title: "Quantum Computing Research",
    description: "Explore the frontiers of quantum algorithms and their applications.",
    requiredSkills: ["Quantum Mechanics", "Python", "Linear Algebra"],
    duration: "12 months",
    location: "REMOTE",
    type: "RESEARCH",
    deadline: "2025-10-01",
    postedBy: users[0].id, 
    experienceLevel: "SENIOR",
  },
  {
    id: `opp-${nextOpportunityId++}`,
    title: "Frontend Development Intern",
    description: "Help build responsive and user-friendly interfaces for our new product.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    duration: "3 months",
    location: "ONSITE",
    type: "INTERNSHIP",
    deadline: "2025-08-20",
    postedBy: users[0].id, 
    experienceLevel: "ENTRY_LEVEL",
  },
  {
    id: `opp-${nextOpportunityId++}`,
    title: "Cybersecurity Research",
    description: "Investigate new threats and develop defensive strategies.",
    requiredSkills: ["Network Security", "Cryptography", "Linux"],
    duration: "9 months",
    location: "REMOTE",
    type: "RESEARCH",
    deadline: "2025-09-10",
    postedBy: users[0].id, 
    experienceLevel: "MID_LEVEL",
  },
  {
    id: `opp-${nextOpportunityId++}`,
    title: "Mobile App Development Intern",
    description: "Contribute to our iOS and Android applications.",
    requiredSkills: ["Swift", "Kotlin", "React Native"],
    duration: "5 months",
    location: "HYBRID",
    type: "INTERNSHIP",
    deadline: "2025-09-05",
    postedBy: users[0].id, 
    experienceLevel: "ENTRY_LEVEL",
  },
  {
    id: `opp-${nextOpportunityId++}`,
    title: "Bioinformatics Research",
    description: "Apply computational techniques to biological data.",
    requiredSkills: ["Biology", "Python", "R", "Genomics"],
    duration: "8 months",
    location: "ONSITE",
    type: "RESEARCH",
    deadline: "2025-09-25",
    postedBy: users[0].id, 
    experienceLevel: "SENIOR",
  },
]

const applications: Application[] = [
  {
    id: `app-${nextApplicationId++}`,
    opportunityId: opportunities[0].id,
    studentId: users[0].id, 
    cvResumeUrl: "https://example.com/cv/student1_cv.pdf",
    message: "Highly interested in NLP research. Have experience with PyTorch.",
    status: "PENDING",
    appliedAt: new Date().toISOString(),
  },
  {
    id: `app-${nextApplicationId++}`,
    opportunityId: opportunities[1].id, 
    studentId: users[0].id, 
    cvResumeUrl: "https://example.com/cv/student1_cv.pdf",
    message: "Eager to contribute to web development projects. Strong React skills.",
    status: "ACCEPTED",
    appliedAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export const mockData = {
  users,
  opportunities,
  applications,
  generateUserId: () => `user-${nextUserId++}`,
  generateOpportunityId: () => `opp-${nextOpportunityId++}`,
  generateApplicationId: () => `app-${nextApplicationId++}`,
}
