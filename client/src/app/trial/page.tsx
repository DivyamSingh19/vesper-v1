import { AiChat } from '@/components/core/AiChat'
import React from 'react'
import AboutVesper from '@/components/buttons/about-vesper'
import DownloadPPT from '@/components/buttons/download-ppt'

const page = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      {/* <AiChat/> */}
      <AboutVesper/>
      <DownloadPPT/>
    </div>
  )
}

export default page
