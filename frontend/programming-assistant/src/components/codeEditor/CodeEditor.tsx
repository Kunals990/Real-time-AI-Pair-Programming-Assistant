"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useCodeStore } from "@/hooks/store";
// import { useCodeStore } from "@/hooks/Store";



export default function CodeEditor() {

  const code = useCodeStore((state)=>state.code);
  const codeChange = useCodeStore((state)=>state.codeChange);


  return (
    <div className="flex">
  
      <div className="w-3/4 p-4">
        <div className="border rounded-lg overflow-hidden">
          <Editor
            height="400px"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={(newValue)=>codeChange(newValue||"")}
          />
        </div>
      </div>
    </div>
  );
}
