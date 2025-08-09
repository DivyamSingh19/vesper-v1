import { AiChat } from '@/components/core/AiChat'
import React from 'react'
import AboutVesper from '@/components/buttons/about-vesper'
import DownloadPPT from '@/components/buttons/download-ppt'
import AppointmentForm from '@/components/forms/appointment-form'


const page = ({
  params,
  searchParams,
}: {
  params: { username: string; eventUrl: string };
  searchParams: { date?: string };
}) => {
  return (
    <div>
      {/* <AiChat/> */}
      {/* <AboutVesper/>
      <DownloadPPT/> */}
      <AppointmentForm params={params} searchParams={searchParams} />
    </div>
  );
};

export default page
