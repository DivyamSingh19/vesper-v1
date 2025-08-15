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
      className="bg-[#1f1f1f] border-t border-black/10 w-full text-[#fdf6e3] "
      logo={<Hexagon className="h-10 w-10 text-[#f97316]" />}
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
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 text-sm">
          <p className="mb-6 leading-relaxed">
            Revolutionizing legal document processing with AI and blockchain
            technology
          </p>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4" />
            <div>
              <div>123 xyz</div>
              <div>hehehehehe</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4" />
            <a href="tel:+912345236423">+(91)2345236423</a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 " />
            <a href="mailto:contact@vesper.legal">contact@vesper.legal</a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-3">
            <li>
              <a href="/products" className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                About
              </a>
            </li>
            <li>
              <a href="/blog" className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-3">
            <li>
              <a href="/pricing" className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                Pricing
              </a>
            </li>
            <li>
              <a href="/support" className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                Support
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="mb-4 text-sm">
            Get the latest legal tech insights and product updates.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 bg-white border border-black/10 rounded-lg focus:outline-none placeholder:text-gray-400"
            />
            <button className="px-4 py-2 bg-[#f97316] text-white rounded-lg hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </Footer>
  );
}
