import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ConfirmBooking from "../buttons/confirmbooking";

interface AppointmentFormProps {
  selectedTime: string;
  onBack: () => void;
}

const AppointmentForm = ({ selectedTime, onBack }: AppointmentFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [meetTitle, setMeetTitle] = useState("");
  const [meetDescription, setMeetDescription] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !meetTitle || !meetDescription) {
      alert("Please fill in all fields!");
      return;
    }
    console.log("Form submitted:", {
      name,
      email,
      meetTitle,
      meetDescription,
      selectedTime,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Book Your Meeting</CardTitle>
        <p className="text-sm text-muted-foreground">
          Selected time: {selectedTime}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="meetTitle">Meeting Title</Label>
            <Input
              id="meetTitle"
              type="text"
              placeholder="What's this meeting about?"
              value={meetTitle}
              onChange={(e) => setMeetTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="meetDescription">Meeting Description</Label>
            <Textarea
              id="meetDescription"
              placeholder="Provide more details about the meeting..."
              value={meetDescription}
              onChange={(e) => setMeetDescription(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="flex justify-around gap-2 pt-4">
            <Button
              type="button"
              variant="default"
              onClick={onBack}
              className="w-50 font-playfair font-semibold text-md"
            >
              Back
            </Button>
            <ConfirmBooking onClick={handleSubmit} className="w-50" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
