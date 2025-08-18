import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/forms/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col gap-6">
        {/* Logo + Title */}
        <div className="flex justify-center">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Vesper
          </a>
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  )
}
