'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthData {
  token: string;
  email: string;
  id: string;
  role: 'lawyer' | 'user';
  stateRollNumber?: string;
}

interface AuthLayoutProps {
  children: React.ReactNode;
  requiredRole?: 'lawyer' | 'user';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, requiredRole }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('auth');
        
        if (!authData) {
           
          router.replace('/login');
          return;
        }

        const parsedAuthData: AuthData = JSON.parse(authData);
        
        // Check if required fields are present
        if (!parsedAuthData.token || !parsedAuthData.role || !parsedAuthData.id) {
          // Invalid auth data, clear localStorage and redirect
          localStorage.removeItem('auth');
          router.replace('/login');
          return;
        }

        // Check if specific role is required and matches
        if (requiredRole && parsedAuthData.role !== requiredRole) {
          // Role mismatch, redirect based on actual role
          const redirectPath = parsedAuthData.role === 'lawyer' 
            ? '/dashboard/lawyer' 
            : '/dashboard/user';
          router.replace(redirectPath);
          return;
        }

        // Auth check passed
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing auth data:', error);
         
        localStorage.removeItem('auth');
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, requiredRole, pathname]);
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 text-sm">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  
  return isAuthenticated ? <>{children}</> : null;
};

export default AuthLayout;

 
export const getCurrentUser = (): AuthData | null => {
  if (typeof window === 'undefined') return null; // SSR check
  
  try {
    const authData = localStorage.getItem('auth');
    if (!authData) return null;
    
    const parsedData: AuthData = JSON.parse(authData);
    
  
    if (!parsedData.token || !parsedData.role || !parsedData.id) {
      return null;
    }
    
    return parsedData;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};


export const logout = (): void => {
  if (typeof window === 'undefined') return; // SSR check
  
  localStorage.removeItem('auth');
  window.location.href = '/login';
};

 
export const useAuth = () => {
  const [user, setUser] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
    setIsLoading(false);
  }, []);

  return { user, isLoading };
};