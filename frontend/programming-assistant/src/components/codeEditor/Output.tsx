"use client";
import { useCodeStore } from '@/hooks/store';
import React, { useState , useEffect } from 'react'
// import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Output() {
  const output = useCodeStore((state)=>state.output);
  const { outputGif, setOutputGif } = useCodeStore();

  // useEffect(()=>{
  //   console.log("this is the output is ",outputGif);
  // },[outputGif])
        return (
          <div className="bg-black text-white p-2 h-32 overflow-y-auto mt-4 border">
            <h3 className="text-sm font-bold">Output{outputGif}</h3>
            {
              outputGif?
              (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              )
              :
              (
                <p>{output}</p>
              )
            }

          </div>
    );
}
