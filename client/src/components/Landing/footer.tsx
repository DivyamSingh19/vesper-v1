import React from "react";
import { Mail, Phone, MapPin, ArrowRight, Scale, Shield, Users } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Document Analysis", href: "#analysis" },
    { name: "Legal Flowcharts", href: "#flowcharts" },
    { name: "AI Insights", href: "#insights" },
    { name: "Pricing", href: "#pricing" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Data Security", href: "#security" }
  ];

  const contactInfo = [
    { icon: Mail, text: "support@vesperai.com", href: "mailto:vesperai.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" }
  ];

  return (
    <footer className="relative bg-white text-gray-800 overflow-hidden border-t border-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-blue-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent)]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-gray-800">Vesper AI</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Transforming legal complexity into clear, actionable insights through AI-powered document analysis and personalized guidance.
            </p>
            <div className="flex items-center gap-4">
               
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-800 relative">
              Features
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-400 transition-all duration-200 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-800 relative">
              Legal
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-400 transition-all duration-200 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-800 relative">
              Contact
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-400 rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <a 
                    href={contact.href}
                    className="text-gray-600 hover:text-blue-400 transition-all duration-200 text-sm flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-400/20 transition-all duration-200">
                      <contact.icon className="w-4 h-4" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{contact.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Vesper AI. All rights reserved. | Empowering legal clarity through AI innovation.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-blue-400 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>AI Services Active</span>
            </div>
             
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-400/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-2xl"></div>
    </footer>
  );
};

export default Footer;