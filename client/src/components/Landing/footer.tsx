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

export default function Footer() {
  return (
    <footer className="bg-[#fdf6e3] border-t border-black/10 w-full text-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Hexagon className="h-10 w-10 text-[#f97316]" />
              <span className="font-bold text-2xl">Vesper Legal</span>
            </div>
            <p className="mb-6 leading-relaxed">
              Revolutionizing legal document processing with AI and blockchain
              technology
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <div>
                  <div>123 Legal Tech Ave, Suite 100</div>
                  <div>San Francisco, CA 94105</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 " />
                <a href="mailto:contact@vesper.legal">contact@vesper.legal</a>
              </div>
            </div>
          </div>

          {/* Products */}
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

          {/* Company */}
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

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4 text-sm">
              Get the latest legal tech insights and product updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-white border border-black/10 rounded-lg focus:outline-none"
              />
              <button className="px-4 py-2 bg-[#f97316] text-white rounded-lg hover:opacity-90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            <div>© 2025 Vesper Legal. All rights reserved.</div>
            <div className="mt-1">Built with ❤️ for the legal community</div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-white rounded-lg">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-white rounded-lg">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-white rounded-lg">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 pt-6 border-t border-black/5 flex flex-wrap justify-center gap-6 text-sm">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/cookies" className="hover:underline">
            Cookie Policy
          </a>
          <a href="/security" className="hover:underline">
            Security
          </a>
        </div>
      </div>
    </footer>
  );
}
