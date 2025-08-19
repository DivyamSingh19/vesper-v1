"use client";
import React, { useState } from "react";
import {
  FileText,
  Users,
  Clock,
  TrendingUp,
  Upload,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Lock,
  Database,
} from "lucide-react";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter()
  const features = [
    {
      icon: MessageSquare,
      title: "AI Legal Assistant",
      desc: "Ask questions and get instant legal guidance powered by AI trained on Indian law.",
    },
    {
      icon: FileText,
      title: "Smart Document Drafting",
      desc: "Automatically generate complaints, petitions, and contracts in legally valid formats.",
    },
    {
      icon: Users,
      title: "Lawyer Matching",
      desc: "Connect with verified pro-bono lawyers based on case type and jurisdiction.",
    },
    {
      icon: BookOpen,
      title: "Legal Research",
      desc: "Search judgments, precedents, and statutes in plain language.",
    },
  ];

  const blockchainBenefits = [
    {
      icon: ShieldCheck,
      title: "Tamper-Proof Records",
      desc: "Every document is securely time-stamped and stored on blockchain for immutability.",
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      desc: "End-to-end encrypted data sharing ensures only authorized access to case files.",
    },
    {
      icon: Database,
      title: "Transparent Audit Trails",
      desc: "Track every case update with verifiable blockchain-backed records.",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-32 py-6 bg-transparent min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">⚖️ Vesper AI</h1>
          <p className="text-gray-600">AI + Blockchain for Legal Justice</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-10">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Justice. Simplified. Secured.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vesper AI empowers marginalized communities to file complaints,
            generate legal documents, and connect with lawyers — all secured
            with blockchain technology.
          </p>
        </div>

        {/* AI Features */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            🌐 AI-Powered Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="p-3 bg-blue-50 rounded-lg w-fit mb-4">
                  <f.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{f.title}</h4>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blockchain Benefits */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            🔗 Blockchain-Powered Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blockchainBenefits.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="p-3 bg-green-50 rounded-lg w-fit mb-4">
                  <b.icon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{b.title}</h4>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-10 text-white text-center">
          <h3 className="text-2xl font-semibold mb-3">
            Ready to Experience Justice Made Simple?
          </h3>
          <p className="text-blue-100 mb-6">
            Try Vesper AI’s prototype today and explore how AI + blockchain can
            transform legal aid.
          </p>
          <button onClick={()=>(router.push("/vesper-ai"))}className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
