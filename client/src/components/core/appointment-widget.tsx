"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { RenderCalendar } from "../calendar/rendercalendar";
import { TimeTable } from "../calendar/timetable";
import TimeSlot from "../buttons/timeslot";
import FormatSwitcher from "../buttons/formatswitcher";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import AppointmentForm from "../forms/appointment-form";

const AppointmentWidget = () => {
  const [format, setFormat] = useState("12h");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    console.log("Selected time:", time);
  };

  const handleNext = () => {
    console.log("Next clicked, showing form");
    setShowForm(true);
  };

  const handleBack = () => {
    console.log("Back clicked, showing time selection");
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 lg:p-6">
        <div className="w-full max-w-4xl mx-auto">
          <Card className="w-full">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                    Book Your Appointment
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Selected time: {selectedTime}
                  </p>
                </div>

                {/* Form Content */}
                <div className="max-w-2xl mx-auto">
                  <AppointmentForm
                    selectedTime={selectedTime}
                    onBack={handleBack}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-7xl mx-auto">
        <CardContent className="p-3 sm:p-5">
          {/* mobile layout */}
          <div className="md:hidden">
            <div className="flex flex-col items-center text-center pb-4 border-b">
              <div className="flex gap-3 items-center mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-lg">M</AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium">Momo</p>
              </div>

              <div className="space-y-2">
                <h1 className="text-xl font-semibold">Meet Title</h1>
                <p className="text-sm text-muted-foreground px-4">
                  Meet description goes here with more details about the meeting
                </p>
              </div>

              <div className="mt-4 space-y-3 w-full max-w-xs">
                <div className="flex items-center justify-center">
                  <CalendarX2 className="size-4 mr-3 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-muted-foreground">
                    09 August 2025
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="size-4 mr-3 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-muted-foreground">
                    30 minutes
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <VideoIcon className="size-4 mr-3 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Meet platform
                  </span>
                </div>
              </div>
            </div>

            <div className="py-4 border-b">
              <div className="flex justify-center">
                <RenderCalendar />
              </div>
            </div>

            <div className="pt-4">
              <div className="flex justify-center mb-4">
                <FormatSwitcher format={format} setFormat={setFormat} />
              </div>

              <div className="max-h-80 overflow-y-auto">
                <TimeSlot
                  format={format}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  onNext={handleNext}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* tablet layout */}
          <div className="hidden md:flex lg:hidden flex-col gap-6">
            <div className="flex justify-center">
              <div className="flex flex-col items-center text-center">
                <div className="flex gap-3 items-center mb-3">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="text-lg">M</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-lg font-medium">Momo</p>
                    <h1 className="text-xl font-semibold">Meet Title</h1>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Meet description goes here with more details about the meeting
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center">
                    <CalendarX2 className="size-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      09 August 2025
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="size-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      30 minutes
                    </span>
                  </div>
                  <div className="flex items-center">
                    <VideoIcon className="size-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Meet platform
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6 justify-center">
              <div className="flex-1 max-w-md">
                <RenderCalendar />
              </div>

              <div className="flex-1 max-w-xs">
                <div className="flex justify-center mb-4">
                  <FormatSwitcher format={format} setFormat={setFormat} />
                </div>

                <ScrollArea className="h-96 w-full rounded-md border p-2">
                  <TimeSlot
                    format={format}
                    selectedTime={selectedTime}
                    onTimeSelect={handleTimeSelect}
                    onNext={handleNext}
                    className="w-full"
                  />
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>
          </div>

          {/* desktop layout */}
          <div className="hidden lg:flex gap-0 justify-center items-stretch min-h-[300px]">
            <div className="flex-1 max-w-xs px-8 py-6 border-r border-border flex flex-col justify-start">
              <div className="flex flex-col items-center text-center h-full">
                <div className="flex gap-3 items-center mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-xl">M</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium">Momo</p>
                </div>

                <div className="space-y-4 mb-8">
                  <h1 className="text-2xl font-semibold">Meet Title</h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Meet description goes here with more details about the
                    meeting
                  </p>
                </div>

                <div className="space-y-5 w-full">
                  <div className="flex items-center">
                    <CalendarX2 className="size-5 mr-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-muted-foreground">
                      09 August 2025
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="size-5 mr-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-muted-foreground">
                      30 minutes
                    </span>
                  </div>
                  <div className="flex items-center">
                    <VideoIcon className="size-5 mr-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Meet platform
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-md px-8 py-6 border-r border-border flex flex-col justify-start">
              <div className="h-full flex items-start justify-center">
                <RenderCalendar />
              </div>
            </div>

            <div className="flex-1 max-w-xl px-8 py-6 flex flex-col justify-start">
              <div className="flex flex-col gap-6 h-full">
                <div className="flex justify-end">
                  <FormatSwitcher format={format} setFormat={setFormat} />
                </div>

                <div className="flex-1">
                  <ScrollArea className="h-[480px] w-full rounded-md border p-3">
                    <TimeSlot
                      format={format}
                      selectedTime={selectedTime}
                      onTimeSelect={handleTimeSelect}
                      onNext={handleNext}
                      className="w-full"
                    />
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentWidget;
