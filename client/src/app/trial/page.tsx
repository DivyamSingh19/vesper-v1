import { AiChat } from "@/components/core/AiChat";
import React from "react";
import AboutVesper from "@/components/buttons/about-vesper";
import DownloadPPT from "@/components/buttons/download-ppt";
import AppointmentForm from "@/components/core/appointment-widget";
import ConfirmBooking from "@/components/buttons/confirmbooking";
import FormatSwitcher from "@/components/buttons/formatswitcher";
import TimeSlot from "@/components/buttons/timeslot";
import AppointmentWidget from "@/components/core/appointment-widget";
import { AboutCard } from "@/components/ui/about-card";
import ViewRepo from "@/components/buttons/view-repo";
import Back from "@/components/buttons/back-button";
const page = () => {
  return (
    <div>
      {/* <AiChat/> */}
      {/* <AboutVesper/>
      <DownloadPPT/> */}
      {/* <AppointmentForm/> */}
      <AppointmentWidget/>
      {/* <ConfirmBooking/> */}
      {/* <FormatSwitcher format={format} setFormat={setFomat}/> */}
      {/* <TimeSlot format={"12h"}/> */}
      {/* <AboutCard/> */}
      {/* <ViewRepo /> */}
      {/* <Back/> */}
    </div>
  );
};

export default page;
