"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import Terminal from "@/components/codeEditor/Terminal";
import RunButton from "@/components/codeEditor/RunButton";
import Output from "@/components/codeEditor/Output";

import CodeEditor from "@/components/codeEditor/CodeEditor";
import InputText from "@/components/codeEditor/InputText";


export default function CodeEditorPage() {
  return (
    <div className="flex">
    
      <div className="w-3/4 p-4 justify-around">
        <CodeEditor/>
        <div className="flex justify-between mt-2">
          <RunButton  />
        </div>

        {/* Terminal and Output Window*/}
        <div >
          <InputText/>
          <Output/>
          <Terminal/>
        </div>
      </div>
    </div>
  );
}
