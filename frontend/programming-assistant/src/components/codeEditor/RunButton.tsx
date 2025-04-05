"use client";
import { useCodeStore } from "@/hooks/store";
import { useEffect, useState } from "react";

interface Status {
  id: number;
  description: string;
}

interface JudgeResponse {
  language_id: number;
  stdout: string;
  status_id: number;
  stderr: string | null;
  status: Status;
}

export default function RunButton() {
  // const [output1, setOutput] = useState("");
  const outputChange = useCodeStore((state)=>state.outputChange);
  const setOutputGif = useCodeStore((state)=>state.setOutputGif);
  const code = useCodeStore((state)=>state.code);
  const inputT = useCodeStore((state)=>state.input);

  //custom fetch to handle timeout
  function fetchWithTimeout(resource: RequestInfo, options: RequestInit = {},timeout=8000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    return fetch(resource, {
      ...options,
      signal: controller.signal,
    }).finally(() => clearTimeout(id));
  }

  const runCode = async() => {
    try {
      setOutputGif(true);
      //convert code to base64 format
      //send code to backend
      let encodedCode = btoa(code);
      let encodedInputText = btoa(inputT);
      let requestCode = {
        "source_code":encodedCode,
        "language_id":54,
        "stdin":encodedInputText
      }
      // const response = await fetchWithTimeout('http://localhost:8080/public/judgeCode', {
      //                   method: 'POST',
      //                   headers: {
      //                     'Content-Type': 'application/json',
      //                   },
      //                   body: JSON.stringify(requestCode),
      //                 })

      const response = await fetchWithTimeout('http://localhost:8080/public/judgeCode', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestCode),
                      },8000);
      
      const data :JudgeResponse = await response.json();
      const decodeOutput = atob(data.stdout);
      
      outputChange(decodeOutput);

    }
    catch(e:any){
        console.log(e);
        outputChange("❌ Error: Could not reach the server. Please try again later.");
    }
    finally{
      setOutputGif(false);
    }
  };

  return (
    <div>
      <button
        onClick={runCode}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        ▶ Run
      </button>
    </div>
  );
}
