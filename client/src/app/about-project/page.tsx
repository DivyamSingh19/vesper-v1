 
import React from 'react'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
const page = () => {
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <HeroVideoDialog
        className="block "
        animationStyle="from-center"
        videoSrc="https://www.example.com/dummy-video"
        thumbnailSrc="https://www.example.com/dummy-thumbnail.png"
        thumbnailAlt="Dummy Video Thumbnail"
      />
    </div>
  );
}

export default page
