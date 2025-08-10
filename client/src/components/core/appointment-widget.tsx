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

// { searchParams }: { params: {username:string; eventUrl:string}
// searchParams:{date?:string} }

// fetch the image from db and pass it later in to this form
const AppointmentWidget = () => {
  //   { searchParams }: { params: {username:string; eventUrl:string}
  // searchParams:{date?:string} }
  //   const selectedDate = searchParams.date
  //     ? new Date(searchParams.date)
  //     : new Date();

  // const formattedDate = new Intl.DateTimeFormat("en-IN", {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long",
  // }).format(selectedDate);

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
      <div className="min-h-screen flex items-center justify-center">
        <AppointmentForm selectedTime={selectedTime} onBack={handleBack} />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[90%] md:w-[40%] mx-auto ">
        <CardContent className="p-5  flex gap-2 flex-col md:flex-row justify-center ">
          <div className="flex-1 max-md:border-b-4 pb-6 md:border-r-2  ">
            <div className="flex gap-2 items-center">
              <Avatar>
                {/* <AvatarImage src="#" alt="User avatar" /> */}
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              {/* fetch the name of the user from the db */}
              <p className="text-md font-medium font-sans text-muted-foreground mt-1">
                Momo
              </p>
            </div>

            {/* fetch the meet title from the db */}
            <h1 className="text-lg font-semibold mt-2">meet title</h1>
            {/* fetch the meet description from the db */}
            <p className="text-sm font-medium text-muted-foreground">
              meet description
            </p>
            {/*fetch date,duration n meet ka platform from db */}
            <div className="mt-5 flex flex-col gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  09 August 2025
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  30 minutes
                </span>
              </p>
              <p className="flex items-center">
                <VideoIcon className="size-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  meet platform
                </span>
              </p>
            </div>
          </div>

          {/* <Separator
            orientation="vertical"
            className=" h-[500px] border-4 bg-orange-400"
          /> */}
          <div className="flex-1 max-md:border-b-4 pb-6 md:border-r-2">
            <RenderCalendar />
          </div>
          {/* <Separator
            orientation="vertical"
            className=" h-screen  border-4 bg-orange-400"
          /> */}
          <div className="flex-1 flex flex-col justify-center ">
            <FormatSwitcher
              format={format}
              setFormat={setFormat}
              className=""
            />
            <ScrollArea className="h-[400px] w-full rounded-md border p-1">
              <TimeSlot
                format={format}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
                onNext={handleNext}
              />
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentWidget;
