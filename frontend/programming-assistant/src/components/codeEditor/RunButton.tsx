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

  const runCode = async() => {
    try {
      setOutputGif(true);
      //convert code to base64 format
      //send code to backend
      let encodedCode = btoa(code);
      let requestCode = {
        "source_code":encodedCode,
        "language_id":54
      }
      const response = await fetch('http://localhost:8080/public/judgeCode', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestCode),
                      })
      
      const data :JudgeResponse = await response.json();
      const decodeOutput = atob(data.stdout);
      // console.log(decodeOutput);
      setOutputGif(false);
      outputChange(decodeOutput);
      // setOutput(decodeOutput);

    }
    catch(e){
        console.log(e);
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
