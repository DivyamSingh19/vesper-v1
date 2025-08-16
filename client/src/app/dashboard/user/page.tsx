"use client"
import React from 'react'
import { useParams } from "next/navigation";

const page = () => {
  const { role } = useParams();
  return <div className='bg-white'>Dashboard for {role}</div>;
}

export default page
