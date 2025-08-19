import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/ui-elements/forms/login-form"
import LoginLayout from "@/components/functions/layout/LoginLayout"

export default function LoginPage() {
  return (
    <LoginLayout> 
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col gap-6">
       
        <div className="flex justify-center">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Vesper
          </a>
        </div>

         
        <LoginForm />
      </div>
    </div>
    </LoginLayout>
  )
}
