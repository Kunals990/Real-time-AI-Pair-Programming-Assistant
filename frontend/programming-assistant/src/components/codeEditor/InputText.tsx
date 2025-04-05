import React from 'react'
import MinHeightTextarea from '../materialUiComponents/MinHeightTextarea'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useCodeStore } from "@/hooks/store";

export default function InputText() {

  const inputT = useCodeStore((state)=>state.input);
  const inputChange = useCodeStore((state)=>state.inputChange);

  return (
    <div>
        <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Input"
            style={{ width: 200 }}
            value={inputT}
            onChange={(e)=>inputChange(e.target.value||"")}
            aria-current
          />
    </div>
  )
}
