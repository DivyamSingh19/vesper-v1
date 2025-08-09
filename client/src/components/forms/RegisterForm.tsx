"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

 
export function RegisterForm({
  className,
  ...props

}: React.ComponentProps<"form">)
 
{
    const router = useRouter();
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Signup to your account</h1>
         
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Name</Label>
          <Input id="name" type="text" placeholder="Satoshi Nakamoto" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
             
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
         </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a onClick={()=>(router.push("/login"))} className="underline underline-offset-4 hover:cursor-pointer">
          Login 
        </a>
      </div>
    </form>
  )
}
