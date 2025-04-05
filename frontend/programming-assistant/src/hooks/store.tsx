import {create} from "zustand";

type CodeStore ={
    code : string;
    codeChange:(newCode :string)=>void;
    output:string;
    outputChange:(newOutput:string)=>void;
    outputGif:boolean;
    setOutputGif:(newOutputGif:boolean)=>void;
    input:string;
    inputChange:(newInput:string)=>void;
    
}
export const useCodeStore = create<CodeStore>((set)=>({
    code:
    `#include<iostream>
using namespace std;

int main(){
    cout<<"Hello World"<<endl;
}`,
    codeChange:(newCode : string)=>{
        set({code:newCode});
    },
    output:"",
    outputChange:(newOuput:string)=>{
        set({output:newOuput});
    },
    outputGif:false,
    setOutputGif:(newOutputGif:boolean)=>{
        set({outputGif:newOutputGif});
    },
    input:"",
    inputChange:(newInput:string)=>{
        set({input:newInput});
    }


}))
