"use client"
import { AiChat } from '@/components/core/AiChat'
import React,{useState} from 'react'
import axios from "axios"
import {toast} from "sonner"
import { Button } from '@/components/ui/button'

const page = () => {
  const [summary, setSummary] = useState("");
  
  const receiveSummary = async () => {
    try {
      const res = await axios.post(
        "/api/v1/summarize-pdf",
        { fileUrl: "https://example.com/my.pdf" },
        { headers: { "Content-Type": "application/json" } }
      );
      setSummary(res.data.summary);
    } catch (error) {
      toast.error("Error receiving summary");
    }
  };

  const generateFlowchart = async () => {
    // button add karna haina summary ke div me
  }

  return (
    <div>
      <AiChat />
      <div className="mt-4 p-4 border rounded">
        <pre>{summary}</pre>
        {summary && (
          <Button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={generateFlowchart}
          >
            Generate Flowchart
          </Button>
        )}
      </div>
    </div>
  );

}

export default page
