"use client";
import React from "react";
import {
  Hexagon,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Footer } from "../ui/footer";

export default function F() {
  return (
    <Footer
      className="border-t border-white/10 w-full text-gray-300"
      logo={<Hexagon className="h-10 w-10 text-orange-500" />}
      brandName="Vesper"
      socialLinks={[
        { icon: <Twitter />, href: "#", label: "Twitter" },
        { icon: <Github />, href: "#", label: "GitHub" },
        { icon: <Linkedin />, href: "#", label: "LinkedIn" },
      ]}
      mainLinks={[
        { href: "/products", label: "Products" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
      ]}
      legalLinks={[
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookies", label: "Cookie Policy" },
        { href: "/security", label: "Security" },
      ]}
      copyright={{
        text: "© 2025 Vesper. All rights reserved.",
        license: "Built for the legal community",
      }}
    >
      <div className="flex flex-col sm:flex-row gap-10 justify-between w-full mx-auto px-4 sm:px-6 lg:px-12">
      
        <div className="space-y-5 max-w-sm">
          <p className="leading-relaxed text-sm sm:text-base text-gray-400">
            Revolutionizing legal document processing with{" "}
            <span className="text-orange-500 font-semibold">
              AI & Blockchain
            </span>{" "}
            for faster, smarter, and accessible legal services.
          </p>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-orange-500" />
            <div>
              <div>123 Legal St.</div>
              <div>Innovation City</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-orange-500" />
            <a
              href="tel:+912345236423"
              className="hover:text-orange-400 transition-colors"
            >
              +91 23452 36423
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-orange-500" />
            <a
              href="mailto:contact@vesper.legal"
              className="hover:text-orange-400 transition-colors"
            >
              contact@vesper.legal
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-20">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-3">
              {[
                { href: "/products", label: "Products" },
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 text-orange-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {[
                { href: "/pricing", label: "Pricing" },
                { href: "/support", label: "Support" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 text-orange-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Footer>
  );
}
