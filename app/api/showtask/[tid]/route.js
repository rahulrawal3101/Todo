import DATABASE_CONNECTION from "@/app/config/connection";
import NewTodo from "@/app/models/newTaskModel";
import { NextResponse } from "next/server";

export const GET =async(req,{params})=>{
    await DATABASE_CONNECTION();
  
    try{
        const respData = await NewTodo.find({tid:params.tid});
        // console.log("response",respData)
         if(respData){
  
           return NextResponse.json({message:"Data Fetched Successfully",resp:respData},{status:200})
         }
         if(!respData){
          return NextResponse.json({message:"Failed To Fetched Data"},{status:200})
         }
    }
    catch(err){
      console.log(err)
      return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
  }