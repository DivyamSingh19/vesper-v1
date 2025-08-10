"use client";
import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { RenderCalendar } from "../calendar/rendercalendar";
import { TimeTable } from "../calendar/timetable";

// { searchParams }: { params: {username:string; eventUrl:string}
// searchParams:{date?:string} }

// fetch the image from db and pass it later in to this form
const AppointmentForm = () => {
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
          {/* vertical nahi ho raha hai separator */}
          {/* <Separator
            orientation="vertical"
            className=" h-[500px] border-4 bg-orange-400"
          /> */}
          <div className="flex-1">
            <RenderCalendar />
          </div>
          {/* <Separator
            orientation="vertical"
            className=" h-screen  border-4 bg-orange-400"
          /> */}
          {/* <div className="flex-1 bg-amber-200">GG</div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentForm;
