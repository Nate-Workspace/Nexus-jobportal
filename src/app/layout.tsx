import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { AuthProvider } from "@/hooks/use-auth"
import { Toaster } from "@/components/ui/toaster"
import { getAuthUser } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Internship & Research Opportunity Portal",
  description: "Find your next internship or research opportunity.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialUser = await getAuthUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider initialUser={initialUser}>
          <Header />
          <main className="flex-1 container py-8">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
