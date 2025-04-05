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
    <div className="flex flex-row">

      <div className="w-3/4 p-4 justify-around">
        <CodeEditor/>
          <RunButton  />
        <div >
          <InputText/>
          <Output/>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
