//@ts-nocheck
"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Search, FileText, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { backendUrl } from '@/store';
const AddAppointmentPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reason: '',
    lawyerEmail: '',
    scheduledAt: ''
  });
  
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLawyerDropdown, setShowLawyerDropdown] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loadingLawyers, setLoadingLawyers] = useState(true);

 

  // Fetch lawyers on component mount
  useEffect(() => {
    fetchLawyers();
  }, []);

  // Filter lawyers based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = lawyers.filter(lawyer => 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLawyers(filtered);
    } else {
      setFilteredLawyers(lawyers);
    }
  }, [searchTerm, lawyers]);

  const fetchLawyers = async () => {
    try {
      setLoadingLawyers(true);
      const response = await fetch(`${backendUrl}/api/v1/appointment/all-lawyers`);
      const data = await response.json();
      
      if (data.success) {
        setLawyers(data.data);
        setFilteredLawyers(data.data);
      } else {
        setMessage({ type: 'error', text: 'Failed to fetch lawyers' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error connecting to server' });
    } finally {
      setLoadingLawyers(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLawyerSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowLawyerDropdown(true);
  };

  const selectLawyer = (lawyer) => {
    setSelectedLawyer(lawyer);
    setFormData(prev => ({
      ...prev,
      lawyerEmail: lawyer.email
    }));
    setSearchTerm(lawyer.name);
    setShowLawyerDropdown(false);
  };

  const clearMessage = () => {
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async () => {
    setLoading(true);
    clearMessage();

    try {
      // Get user email from localStorage
      const userEmail = localStorage.getItem('email');
      if (!userEmail) {
        setMessage({ type: 'error', text: 'User not logged in. Please log in first.' });
        setLoading(false);
        return;
      }

      // Validate form data
      if (!formData.title || !formData.description || !formData.reason || !formData.lawyerEmail || !formData.scheduledAt) {
        setMessage({ type: 'error', text: 'Please fill in all fields' });
        setLoading(false);
        return;
      }

      const appointmentData = {
        ...formData,
        userEmail
      };

      const response = await fetch(`${backendUrl}/api/v1/appointment/add-appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Appointment created successfully!' });
        // Reset form
        setFormData({
          title: '',
          description: '',
          reason: '',
          lawyerEmail: '',
          scheduledAt: ''
        });
        setSelectedLawyer(null);
        setSearchTerm('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create appointment' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error connecting to server. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Get minimum datetime for scheduling (current time + 1 hour)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-32 py-6 bg-transparent min-h-screen">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Schedule Appointment</h1>
            <p className="text-gray-600">Book a consultation with a legal professional</p>
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Appointment Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Legal Consultation for Contract Review"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed information about your legal matter..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            {/* Reason Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Consultation
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a reason</option>
                <option value="Contract Review">Contract Review</option>
                <option value="Legal Advice">Legal Advice</option>
                <option value="Litigation Support">Litigation Support</option>
                <option value="Document Preparation">Document Preparation</option>
                <option value="Business Law">Business Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Property Law">Property Law</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Lawyer Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Select Lawyer
              </label>
              <div className="relative">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleLawyerSearch}
                    onFocus={() => setShowLawyerDropdown(true)}
                    placeholder={loadingLawyers ? "Loading lawyers..." : "Search lawyers by name, specialization, or email"}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loadingLawyers}
                  />
                </div>

                {showLawyerDropdown && !loadingLawyers && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredLawyers.length > 0 ? (
                      filteredLawyers.map((lawyer) => (
                        <div
                          key={lawyer.id}
                          onClick={() => selectLawyer(lawyer)}
                          className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-800">{lawyer.name}</div>
                          <div className="text-sm text-blue-600">{lawyer.specialization}</div>
                          <div className="text-xs text-gray-500">{lawyer.email}</div>
                          {lawyer.stateRollNumber && (
                            <div className="text-xs text-gray-400">Roll No: {lawyer.stateRollNumber}</div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-gray-500 text-center">
                        No lawyers found matching your search
                      </div>
                    )}
                  </div>
                )}
              </div>

              {selectedLawyer && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800">{selectedLawyer.name}</div>
                  <div className="text-sm text-blue-600">{selectedLawyer.specialization}</div>
                  <div className="text-xs text-blue-500">{selectedLawyer.email}</div>
                </div>
              )}
            </div>

            {/* Scheduled Date and Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Scheduled Date & Time
              </label>
              <input
                type="datetime-local"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleInputChange}
                min={getMinDateTime()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Please select a date and time at least 1 hour from now
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || loadingLawyers || !selectedLawyer}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Appointment...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  Schedule Appointment
                </>
              )}
            </button>
         
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">📋 Appointment Guidelines</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Appointments must be scheduled at least 1 hour in advance</li>
              <li>• Please provide detailed information to help the lawyer prepare</li>
              <li>• You will receive a confirmation once the appointment is created</li>
              <li>• Make sure to arrive on time for your scheduled consultation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showLawyerDropdown && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowLawyerDropdown(false)}
        />
      )}
    </div>
    </div>
  );
};

export default AddAppointmentPage;