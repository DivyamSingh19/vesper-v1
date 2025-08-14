"use client";
import React, { useState, useCallback } from "react";
import { ChevronDown, Hexagon, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface HeaderProps {
  className?: string;
  onRegisterClick?: () => void;
  onNavItemClick?: (item: string) => void;
}

interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string; description?: string }[];
}

const Header: React.FC<HeaderProps> = ({
  className = "",
  onRegisterClick,
  onNavItemClick,
}) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      label: "Getting Started",
      href: "/getting-started",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Quick Start Guide",
          href: "/guide",
          description: "Get up and running in minutes",
        },
        {
          label: "Documentation",
          href: "/docs",
          description: "Comprehensive API documentation",
        },
        {
          label: "Tutorials",
          href: "/tutorials",
          description: "Step-by-step tutorials",
        },
      ],
    },
    {
      label: "Our Features",
      href: "/features",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "AI Analysis",
          href: "/features/ai",
          description: "Advanced document analysis",
        },
        {
          label: "Blockchain Security",
          href: "/features/security",
          description: "Tamper-proof storage",
        },
        {
          label: "Team Collaboration",
          href: "/features/collaboration",
          description: "Work together seamlessly",
        },
      ],
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  const handleRegisterClick = useCallback(() => {
    onRegisterClick?.();
    router.push("/register");
  }, [onRegisterClick, router]);

  const handleNavItemClick = useCallback(
    (item: NavItem) => {
      onNavItemClick?.(item.label);
      if (item.href) {
        router.push(item.href);
      }
    },
    [onNavItemClick, router]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback((label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  }, []);

  return (
    <header
      className={`w-full mx-auto text-[#d1cfc0] border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between bg-[#1f1f1f]/95 backdrop-blur-sm sticky top-0 z-50 ${className}`}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => router.push("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        role="button"
        tabIndex={0}
        aria-label="Navigate to Vesper homepage"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push("/");
          }
        }}
      >
        <Hexagon className="h-8 w-8 text-[#f76f53] group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-bold text-xl text-white group-hover:text-[#f76f53] transition-colors duration-300">
          Vesper
        </span>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
        {navItems.map((item) => (
          <div key={item.label} className="relative group">
            <button
              className="flex items-center gap-1 hover:text-[#f76f53] transition-colors duration-300 py-2"
              onClick={() => {
                if (item.hasDropdown) {
                  toggleDropdown(item.label);
                } else {
                  handleNavItemClick(item);
                }
              }}
              onMouseEnter={() =>
                item.hasDropdown && setActiveDropdown(item.label)
              }
              onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              aria-expanded={activeDropdown === item.label}
              aria-haspopup={item.hasDropdown}
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    activeDropdown === item.label ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Dropdown */}
            {item.hasDropdown && item.dropdownItems && (
              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-64 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-xl backdrop-blur-sm"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <button
                          key={dropdownItem.label}
                          className="w-full text-left p-3 rounded-lg hover:bg-[#f76f53]/10 hover:text-[#f76f53] transition-colors duration-200 group"
                          onClick={() => {
                            router.push(dropdownItem.href);
                            setActiveDropdown(null);
                          }}
                        >
                          <div className="font-medium text-white group-hover:text-[#f76f53]">
                            {dropdownItem.label}
                          </div>
                          {dropdownItem.description && (
                            <div className="text-xs text-gray-400 mt-1">
                              {dropdownItem.description}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Register Button */}
        <motion.button
          className="bg-[#fdf6e3] text-[#1f1f1f] px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          onClick={handleRegisterClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Register for Vesper account"
        >
          Register
          <ArrowRight className="h-4 w-4" />
        </motion.button>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-[#2a2a2a] border-t border-white/10 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center justify-between"
                    onClick={() => {
                      if (item.hasDropdown) {
                        toggleDropdown(item.label);
                      } else {
                        handleNavItemClick(item);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    aria-expanded={activeDropdown === item.label}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && item.dropdownItems && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 space-y-1"
                        >
                          {item.dropdownItems.map((dropdownItem) => (
                            <button
                              key={dropdownItem.label}
                              className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-sm"
                              onClick={() => {
                                router.push(dropdownItem.href);
                                setIsMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {dropdownItem.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
