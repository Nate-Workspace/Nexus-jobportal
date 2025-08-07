"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserIcon } from "lucide-react"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth() // Removed isProfessor

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background mx-0 flex justify-center">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          Opportunity Portal
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/opportunities" passHref>
            <Button variant="ghost">Opportunities</Button>
          </Link>
          {isAuthenticated ? (
            <>
              {/* Removed Post Opportunity link */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <UserIcon className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user?.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.role}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
