import { type NextRequest, NextResponse } from "next/server"
import { setAuthCookie, clearAuthCookie } from "@/lib/auth"
import { mockData } from "@/lib/graphql-mock-data"
import type { UserRole } from "@/lib/types" // Import UserRole

export async function POST(req: NextRequest) {
  const { email } = await req.json() // Removed 'role' from destructuring

  // All users will be STUDENTS
  const role: UserRole = "STUDENT"

  // Simulate user lookup/creation
  let user = mockData.users.find((u) => u.email === email && u.role === role)

  if (!user) {
    // If not found, create a new user (always STUDENT)
    const existingUser = mockData.users.find((u) => u.email === email)
    if (existingUser) {
      // If user exists with this email but different role (which shouldn't happen now as only STUDENT exists)
      // Or if trying to sign up with an existing email
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }
    user = { id: mockData.generateUserId(), email, password: "mock-password", role } // Assign a mock password
    mockData.users.push(user)
  }

  // Set auth cookie
  const response = NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } })
  await setAuthCookie(user.id, user.role)
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out" })
  await clearAuthCookie()
  return response
}
