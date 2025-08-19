//@ts-nocheck
"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, FileText, Search, Filter, ChevronLeft, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '@/store';
const AppointmentsDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAppointments, setTotalAppointments] = useState(0);
  
  const appointmentsPerPage = 10;

  const fetchAppointments = async (page = 1) => {
    try {
      setLoading(true);
      
       
      const userEmail = localStorage.getItem('email');
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      
      if (!userEmail || !token) {
        setError('User authentication required. Please log in.');
        setLoading(false);
        return;
      }

      const offset = (page - 1) * appointmentsPerPage;
      
      const response = await axios.get(`${backendUrl}/api/v1/appointment/user/${userEmail}`, {
        params: {
          limit: appointmentsPerPage,
          offset: offset
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setAppointments(response.data.appointments);
        setTotalAppointments(response.data.total);
        setError(null);
      } else {
        setError(response.data.message || 'Failed to fetch appointments');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        // Optionally clear localStorage and redirect to login
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
      } else {
        setError('Failed to fetch appointments. Please try again.');
      }
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(currentPage);
  }, [currentPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (scheduledAt) => {
    const now = new Date();
    const appointmentDate = new Date(scheduledAt);
    
    if (appointmentDate < now) {
      return 'bg-gray-100 text-gray-600';
    } else if (appointmentDate - now < 24 * 60 * 60 * 1000) {
      return 'bg-orange-100 text-orange-600';
    } else {
      return 'bg-green-100 text-green-600';
    }
  };

  const getStatusText = (scheduledAt) => {
    const now = new Date();
    const appointmentDate = new Date(scheduledAt);
    
    if (appointmentDate < now) {
      return 'Completed';
    } else if (appointmentDate - now < 24 * 60 * 60 * 1000) {
      return 'Upcoming';
    } else {
      return 'Scheduled';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.lawyer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    
    const status = getStatusText(appointment.scheduledAt).toLowerCase();
    return matchesSearch && status === filterStatus;
  });

  const totalPages = Math.ceil(totalAppointments / appointmentsPerPage);

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-32 py-6 bg-transparent min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96"></div>
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
              <p className="text-gray-600 mt-1">Manage and track all your legal consultations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">{totalAppointments} Total Appointments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
            <button 
              onClick={() => fetchAppointments(currentPage)} 
              className="ml-auto text-red-700 hover:text-red-900 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments, lawyers, or reasons..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'You haven\'t scheduled any appointments yet'}
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.scheduledAt)}`}>
                          {getStatusText(appointment.scheduledAt)}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">{formatDate(appointment.scheduledAt)}</span>
                        </div>
                        
                        {appointment.lawyer && (
                          <div className="flex items-center text-gray-600">
                            <User className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">{appointment.lawyer.name}</span>
                            <span className="text-sm ml-2">({appointment.lawyer.email})</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-gray-600">
                          <FileText className="h-4 w-4 mr-2" />
                          <span className="text-sm">{appointment.reason}</span>
                        </div>
                      </div>
                      
                      {appointment.description && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">{appointment.description}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6 flex-shrink-0">
                      <div className="flex flex-col items-end gap-2">
                        {appointment.lawyer?.walletAddress && (
                          <div className="bg-green-50 px-3 py-1 rounded-full">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-xs text-green-700 font-medium">Blockchain Secured</span>
                            </div>
                          </div>
                        )}
                        <span className="text-xs text-gray-500">
                          Created {formatDate(appointment.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * appointmentsPerPage) + 1} to {Math.min(currentPage * appointmentsPerPage, totalAppointments)} of {totalAppointments} appointments
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center space-x-1">
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsDashboard;