"use client";
import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { RenderCalendar } from "../calendar/rendercalendar";
import { TimeTable } from "../calendar/timetable";

// fetch the image from db and pass it later in to this form
const AppointmentForm = ({ searchParams }: { params: {username:string; eventUrl:string}
searchParams:{date?:string} }) => {
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-xl w-full mx-auto">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
          <div>
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
          {/* vertical nahi ho raha hai separator */}
          <Separator
            orientation="horizontal"
            className=" h-screen w-px bg-border"
          />
          <RenderCalendar />
          <Separator
            orientation="horizontal"
            className=" h-screen w-px bg-border"
          />
          <TimeTable selectedDate={selectedDate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentForm;
