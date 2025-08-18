"use client"
import React, { useState, useEffect, ReactNode } from 'react';
import {  Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router= useRouter()
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    try {
      // Check if email and token exist in localStorage
      const email = localStorage.getItem('adminData');
      const token = localStorage.getItem('adminToken');
      
      if (email && token) {
        // Both email and token are present
        setIsAuthenticated(true);
      } else {
        // Either email or token is missing
        setIsAuthenticated(false);
        // Redirect to login page
        redirectToLogin();
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
      redirectToLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToLogin = () => {
    router.push("/login")
  };

  const handleLogout = () => {
   
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminToken');
    redirectToLogin();
  };

  // Loading state while checking authentication
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

 
  if (!isAuthenticated) {
    return null;
  }

 
  return (
    <div className="min-h-screen bg-gray-50">
     {children}
    </div>
  );
};

export default AuthLayout;