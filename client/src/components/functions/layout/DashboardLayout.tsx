"use client"
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}
const AuthDashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    checkAuthentication;
  }, []);
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("token");
  const token = localStorage.getItem("token");
  const checkAuthentication = () => {
    try {
      if (email || token || role) {
        setIsAuthenticated(true);
        rediretToDashboard();
      } else {
        setIsAuthenticated(false);
        redirectToLogin();
      }
    } catch (error) {
      console.error("Error checking authentication", error);
      setIsAuthenticated(false);
      redirectToLogin();
    } finally {
      setIsLoading(false);
    }
  };
  const redirectToLogin = () => {
    router.push("/login");
  };
  const rediretToDashboard = () => {
    if (role == "user") {
      router.push("/dashboard/user");
    } else {
      router.push("/dashboard/lawyer");
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }
  return <div className="min-h-screen">{children}</div>;
};

export default AuthDashboardLayout;
