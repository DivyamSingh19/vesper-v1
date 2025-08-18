"use client";

import React, { useState } from "react";
import { postAppointmentAsync } from "../services/dashServices";

const AppointmentForm = ({ lawyer, onBack }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reason: "",
    userEmail: "",
    scheduledAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ...formData,
      lawyerEmail: lawyer.email,
    };

    console.log(payload);
    

    try {
      const response = await postAppointmentAsync(payload);

      setMessage({
        type: "success",
        text: "Appointment booked successfully!",
      });
      setFormData({
        title: "",
        description: "",
        reason: "",
        userEmail: "",
        scheduledAt: "",
      });
    } catch (error: any) {
      console.error("Submission error:", error);

      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }; // ✅ properly closed here

  return (
    <div className="w-full">
      <div className="p-6 border-3 rounded-lg shadow-sm">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 rounded-md bg-gray-200 text-sm text-black transition"
        >
          &larr; Back to Lawyers
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold mb-2">Book an Appointment</h2>
        <p className="mb-6">
          You are booking an appointment with{" "}
          <span className="text-green-600 font-medium">{lawyer.name}</span>.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-md  border border-gray-300 
                         px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500/50"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-md  border border-gray-300 
                         px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500/50"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium mb-1">
              Reason
            </label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 
                         px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500/50"
            />
          </div>
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 
                         px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500/50"
            />
          </div>
          <div>
            <label
              htmlFor="scheduledAt"
              className="block text-sm font-medium mb-1"
            >
              Scheduled Time
            </label>
            <input
              type="datetime-local"
              id="scheduledAt"
              name="scheduledAt"
              value={formData.scheduledAt}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 
                         px-3 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium 
                       py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Submit Appointment"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-md mt-5 text-center text-white ${
              message.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
