"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Mail, MessageSquare } from "lucide-react";
import ConfirmBooking from "../buttons/confirmbooking";
import Back from "../buttons/back-button";

interface AppointmentFormProps {
  selectedTime: string;
  selectedDate?: Date;
  onBack: () => void;
}

const AppointmentForm = ({
  selectedTime,
  selectedDate,
  onBack,
}: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("Form submitted:", { ...formData, selectedTime });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormIncomplete = useMemo(() => {
    return !formData.name || !formData.email;
  }, [formData.name, formData.email]);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Back
          onClick={onBack}
          className="self-start sm:self-auto flex items-center gap-2 px-3 py-2"
        />

        <div className="flex-1">
          <h3 className="text-lg sm:text-xl text-center font-semibold">
            Appointment Details
          </h3>
          <div className="text-sm text-center text-muted-foreground mt-1 space-y-1">
            {selectedDate && (
              <p>
                Date:{" "}
                <span className="font-medium">
                  {selectedDate.toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            )}
            <p>
              Time: <span className="font-medium">{selectedTime}</span>
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2 sm:col-span-1">
            <Label
              htmlFor="name"
              className="text-sm font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2 sm:col-span-1">
            <Label
              htmlFor="email"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="message"
            className="text-sm font-medium flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Message (Optional)
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Add any additional notes or questions..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 sm:flex-none sm:px-8 h-11"
          >
            Cancel
          </Button>
          <div className="flex-1 sm:flex-none sm:min-w-[200px]">
            <ConfirmBooking
              onClick={handleSubmit}
              disabled={isFormIncomplete}
              className="h-11 rounded-md"
            />
          </div>
        </div>
      </form>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h4 className="text-sm font-medium mb-2">What happens next?</h4>
        <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
          <li>• You'll receive a confirmation email</li>
          <li>• Meeting details will be sent 24 hours before</li>
          <li>• You can reschedule up to 2 hours before the meeting</li>
        </ul>
      </div>
    </div>
  );
};

export default AppointmentForm;
