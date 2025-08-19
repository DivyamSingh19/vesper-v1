"use client"
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  useEffect(() => {
    const checkAuth = (): void => {
      // Mock data for demo - replace with localStorage/session check
      const role = "user";
      const email = "user@example.com";
      const isAuthenticated = !!(role && email);

      setAuthState({
        isAuthenticated,
        role: role?.toLowerCase() as "user" | "lawyer" | null,
        email,
      });
    };

    checkAuth();
  }, []);

  const clearAuth = (): void => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      console.log("Auth data cleared from localStorage");
    } catch (error) {
      console.error("Failed to clear authentication data:", error);
    }
  };

  const handleLogin = (): void => {
    router.push("/login");
  };

  const handleLogout = (): void => {
    clearAuth();
    setAuthState({ isAuthenticated: false, role: null, email: null });
    router.push("/");
  };

  const handleSignUp = (): void => {
    router.push("/register");
  };

  const handleDashboard = (): void => {
    if (authState.role === "user") {
      router.push("/dashboard/user");
    } else if (authState.role === "lawyer") {
      router.push("/dashboard/lawyer");
    }
  };

  const navLinks = [
    { href: "#analysis", label: "Features" },
    { href: "#flowchart", label: "Flowcharts" },
    { href: "#features", label: "About" },
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 fixed top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo (Left) */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 font-bold text-xl tracking-tight">
            Vesper AI
          </span>
        </div>

        {/* Centered navLinks */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Auth Buttons (Right) */}
        <div className="hidden md:flex items-center space-x-4">
          {authState.isAuthenticated ? (
            <>
              <button
                onClick={handleDashboard}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5"
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
            className="text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 relative"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Menu
                className={`w-6 h-6 transition-all duration-300 ${
                  mobileOpen
                    ? "opacity-0 rotate-180 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`w-6 h-6 absolute transition-all duration-300 ${
                  mobileOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-180 scale-75"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 space-y-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 mx-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-600 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            {authState.isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
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
