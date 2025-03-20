"use client";
import { useState } from "react";

export default function Terminal() {
  const [logs, setLogs] = useState<string[]>([]);

  return (
    <div className="bg-black text-white p-2 h-32 overflow-y-auto mt-4 border">
      <h3 className="text-sm font-bold">Terminal</h3>
      {logs.length === 0 ? <p>No output yet...</p> : logs.map((log, index) => (
        <p key={index} className="text-green-400">{log}</p>
      ))}
    </div>
  );
}
