"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Gavel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { registerAdv, registerUser } from "@/app/services/authService";
import Image from "next/image";
import { ethers } from "ethers";
import { toast } from "sonner";
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "lawyer">("user");
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected. Please install it.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        toast.success(`Connected: ${accounts[0]}`);
      }
    } catch (error) {
      console.error("MetaMask connection error:", error);
      toast.error("Failed to connect to MetaMask.");
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      email: String(formData.get("email") || "").trim(),
      name: String(formData.get("name") || "").trim(),
      password: String(formData.get("password") || "").trim(),
      role,
      walletAddress,
    };

    try {
      if (role === "lawyer") {
        let stateRollNumber = String(
          formData.get("stateRollNumber") || ""
        ).trim();
        stateRollNumber = stateRollNumber.replace(/\//g, "");
        payload.stateRollNumber = stateRollNumber;

        const res = await registerAdv(payload);
        console.log(res);

        router.push("/dashboard/lawyer");
      } else {
        const res = await registerUser(payload);
        router.push("/dashboard/user");
        
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Role Switch */}
      <div className="flex gap-2 bg-muted p-1 rounded-lg">
        {[
          { key: "user", label: "User", icon: User },
          { key: "lawyer", label: "Lawyer", icon: Gavel },
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            type="button"
            onClick={() => setRole(key as "user" | "lawyer")}
            variant={role === key ? "default" : "ghost"}
            className="flex-1 flex items-center gap-2 capitalize"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Signup as <span className="text-primary">{role}</span>
        </h1>
      </div>

      {/* Common Fields */}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Satoshi Nakamoto"
            required
          />
        </div>

        {/* Lawyer Field */}
        <AnimatePresence>
          {role === "lawyer" && (
            <motion.div
              key="lawyer-field"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid gap-3"
            >
              <Label htmlFor="stateRollNumber">State Roll Number</Label>
              <Input
                id="stateRollNumber"
                name="stateRollNumber"
                type="text"
                placeholder="Enter your state roll number"
                required
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={connectMetaMask}
          className="w-full"
        >
          <div className="flex items-center gap-2">
            <span>Connect to MetaMask</span>
            <Image
              src="/images/metamask-icon.svg"
              width={24}
              height={24}
              alt="Metamask Logo"
            />
          </div>
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="underline underline-offset-4 hover:cursor-pointer"
        >
          Login
        </span>
      </div>
    </form>
  );
}
