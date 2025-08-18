"use client"
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // modern icons

interface AuthState {
  isAuthenticated: boolean;
  role: "user" | "lawyer" | null;
  email: string | null;
}

const Navbar: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    email: null,
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkAuth = (): void => {
      const role = localStorage.getItem("role");
      const email = localStorage.getItem("email");
      const isAuthenticated = !!(role && email);

      setAuthState({
        isAuthenticated,
        role: role?.toLowerCase() as "user" | "lawyer" | null,
        email,
      });
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogin = (): string => (window.location.href = "/login");
  const handleLogout = (): void => {
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setAuthState({ isAuthenticated: false, role: null, email: null });
    window.location.href = "/";
  };
  const handleSignUp = (): string => (window.location.href = "/register");
  const handleDashboard = (): void => {
    if (authState.role === "user") {
      window.location.href = "/dashboard/user";
    } else if (authState.role === "lawyer") {
      window.location.href = "/dashboard/lawyer";
    }
  };

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#solution", label: "Solution" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
  ];

  return (
    <nav className="w-full bg-transparent px-6 py-4 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">TT</span>
          </div>
          <span className="text-gray-900 font-bold text-xl tracking-tight">
            tailark
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {authState.isAuthenticated ? (
            <>
              <button
                onClick={handleDashboard}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 hover:text-blue-600"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 space-y-4 bg-white rounded-lg shadow-md p-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col space-y-3 pt-4 border-t">
            {authState.isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="w-full px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="w-full px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="w-full px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
