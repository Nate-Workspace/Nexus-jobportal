"use client"

import * as React from "react"
import type { User } from "@/lib/types" 
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string) => Promise<void> 
  signup: (email: string) => Promise<void> 
  logout: () => Promise<void>
  isAuthenticated: boolean
  isStudent: boolean 
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  const [user, setUser] = React.useState<User | null>(initialUser)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const {toast} = useToast()

  const login = React.useCallback(
    async (email: string) => {
      
      setIsLoading(true)
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password: "password", role: "STUDENT" }), // Hardcoded role
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          toast({
            title: "Logged in successfully!",
            description: `Welcome, ${data.user.email}.`,
          })
          router.push("/dashboard")
        } else {
          const errorData = await res.json()
          toast({
            title: "Login failed",
            description: errorData.message || "Invalid credentials.",
            variant: "destructive",
          })
        }
      } catch (error: any) {
        toast({
          title: "Login error",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const signup = React.useCallback(
    async (email: string) => {
      
      setIsLoading(true)
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password: "password", role: "STUDENT" }), // Hardcoded role
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          toast({
            title: "Signed up successfully!",
            description: `Welcome, ${data.user.email}.`,
          })
          router.push("/dashboard")
        } else {
          const errorData = await res.json()
          toast({
            title: "Signup failed",
            description: errorData.message || "User already exists or invalid data.",
            variant: "destructive",
          })
        }
      } catch (error: any) {
        toast({
          title: "Signup error",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [router],
  )

  const logout = React.useCallback(async () => {
    setIsLoading(true)
    try {
      await fetch("/api/auth", { method: "DELETE" })
      setUser(null)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const isAuthenticated = !!user
  const isStudent = !!user 

  const value = React.useMemo(
    () => ({
      user,
      isLoading,
      login,
      signup,
      logout,
      isAuthenticated,
      isStudent,
    }),
    [user, isLoading, login, signup, logout, isAuthenticated, isStudent],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
