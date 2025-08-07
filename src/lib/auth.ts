import { cookies } from "next/headers"
import type { User, UserRole } from "./types"
import { mockData } from "./graphql-mock-data"

const AUTH_COOKIE_NAME = "auth_token"

// In a real app, this would be a JWT or session token
// For this mock, we'll just store the user ID and role
interface MockAuthToken {
  userId: string
  role: UserRole
}

export async function setAuthCookie(userId: string, role: UserRole) {
  const token: MockAuthToken = { userId, role }
  ;(await cookies()).set(AUTH_COOKIE_NAME, JSON.stringify(token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
}

export async function getAuthUser(): Promise<User | null> {
  const tokenCookie = (await cookies()).get(AUTH_COOKIE_NAME)
  if (!tokenCookie) {
    return null
  }

  try {
    const token: MockAuthToken = JSON.parse(tokenCookie.value)
    const user = mockData.users.find((u) => u.id === token.userId && u.role === token.role)
    if (user) {
      // Return user without password for security
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword as User
    }
    return null
  } catch (error) {
    console.error("Failed to parse auth token:", error)
    return null
  }
}

export async function clearAuthCookie() {
  (await cookies()).delete(AUTH_COOKIE_NAME)
}
