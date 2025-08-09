"use client"
import React from 'react'
import { useParams } from "next/navigation";

const page = () => {
  const { role } = useParams();
  return <div>Dashboard for {role}</div>;
}

export default page
