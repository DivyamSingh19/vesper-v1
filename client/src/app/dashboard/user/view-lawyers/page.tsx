"use client";

import React, { useState } from "react";
import AppointmentForm from "@/components/core/appointment-widget";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function page() {
  const [view, setView] = useState("list");
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const dummyLawyers = [
    {
      id: 1,
      name: "Aryan gg",
      email: "ary@gmail.com",
      specialization: "Marital Affairs",
    },
    {
      id: 2,
      name: "Vaish gg",
      email: "vvv@gmail.com",
      specialization: "Divorce Law",
    },
    {
      id: 3,
      name: "Divyam Singh",
      email: "div@gmail.com",
      specialization: "Family Law",
    },
  ];

  const handleBookAppointment = (lawyer: any) => {
    setSelectedLawyer(lawyer);
    setView("form");
  };

  const handleBackToList = () => {
    setSelectedLawyer(null);
    setView("list");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {view === "list" ? (
        <Table>
          <TableCaption>A list of all Advocates.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyLawyers.map((lawyer) => (
              <TableRow key={lawyer.email}>
                <TableCell>{lawyer.name}</TableCell>
                <TableCell>{lawyer.email}</TableCell>
                <TableCell>{lawyer.specialization}</TableCell>
                <TableCell className="text-right">
                  <button onClick={() => handleBookAppointment(lawyer)}>
                    Book Appointment
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <AppointmentForm lawyer={selectedLawyer} onBack={handleBackToList} />
      )}
    </div>
  );
}

export default page;
