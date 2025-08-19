"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthData {
  token: string | null;
  email: string | null;
  role: "user" | "lawyer" | null;
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role") as "user" | "lawyer" | null;

    const authData: AuthData = { token, email, role };

    if (!authData.token || !authData.email || !authData.role) {
      router.replace("/login");  
      return;
    }

 
    if (authData.role === "user") {
      router.replace("/");
    } else if (authData.role === "lawyer") {
      router.replace("/ ");
    } else {
      router.replace("/login"); 
    }
  }, [router]);

   
  return <>{children}</>;
}
