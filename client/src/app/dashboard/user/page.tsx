"use client"
import React, { useState } from 'react';
import { FileText, Users, Clock, TrendingUp, Plus, Search, Bell, User, Settings, Upload, BookOpen, MessageSquare, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const recentDocuments = [
    { id: 1, name: 'Employment Contract - Tech Corp', type: 'Contract Review', status: 'Completed', date: '2 hours ago' },
    { id: 2, name: 'NDA - Client Meeting', type: 'Document Analysis', status: 'In Progress', date: '4 hours ago' },
    { id: 3, name: 'Lease Agreement Review', type: 'Legal Summary', status: 'Completed', date: '1 day ago' },
    { id: 4, name: 'Partnership Agreement', type: 'Risk Assessment', status: 'Pending', date: '2 days ago' }
  ];

  const quickActions = [
    { icon: Upload, title: 'Upload Document', desc: 'Get AI analysis of legal documents' },
    { icon: BookOpen, title: 'Legal Research', desc: 'Search case law and precedents' },
    { icon: MessageSquare, title: 'Ask Vesper', desc: 'Get instant legal guidance' },
    { icon: Users, title: 'Find Lawyer', desc: 'Connect with verified attorneys' }
  ];

  const stats = [
    { label: 'Documents Processed', value: '247', change: '+12%', icon: FileText },
    { label: 'Hours Saved', value: '156', change: '+8%', icon: Clock },
    { label: 'Lawyers Connected', value: '23', change: '+15%', icon: Users },
    { label: 'Success Rate', value: '94%', change: '+2%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Vesper AI</h1>
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('documents')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'documents' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Documents
              </button>
              <button 
                onClick={() => setActiveTab('lawyers')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'lawyers' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lawyers
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search documents, cases..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex</h2>
          <p className="text-gray-600">Here's what's happening with your legal matters today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 text-left group"
              >
                <div className="p-3 bg-blue-50 rounded-lg mb-4 w-fit group-hover:bg-blue-100 transition-colors">
                  <action.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-500">{doc.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doc.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          doc.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{doc.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="space-y-6">
            {/* Today's Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-blue-600 rounded-full">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">Contract Risk Alert</p>
                      <p className="text-xs text-blue-700 mt-1">3 contracts need attention for compliance issues</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-green-600 rounded-full">
                      <BarChart3 className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Efficiency Boost</p>
                      <p className="text-xs text-green-700 mt-1">You've saved 12 hours this week with AI summaries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">Drop files here or click to upload</p>
                <p className="text-xs text-gray-400">PDF, DOC, TXT supported</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm text-gray-600">Document analyzed: Employment Contract</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p className="text-sm text-gray-600">Lawyer consultation booked</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <p className="text-sm text-gray-600">Risk assessment completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Need Legal Guidance?</h3>
              <p className="text-blue-100">Get instant AI-powered analysis or connect with verified lawyers</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Ask Vesper AI
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors">
                Find Lawyer
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;