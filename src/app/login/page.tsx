import { AuthForm } from "@/components/auth-form"
import { getAuthUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const user = await getAuthUser()
  if (user) {
    redirect("/dashboard") // Redirect if already logged in
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <AuthForm type="login" />
    </div>
  )
}
