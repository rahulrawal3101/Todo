import DATABASE_CONNECTION from "@/app/config/connection"
import NewTodo from "@/app/models/newTaskModel";
import { NextResponse } from "next/server";

export const POST =async(req)=>{
     await DATABASE_CONNECTION();
     try{
       const body =await req.json();
      //  console.log("posted data",body)
      const toSave =await NewTodo(body);
      // console.log("toSave",toSave)
      const saved = await toSave.save();

      if(saved){
        return NextResponse.json({message:"Task Added Successfully",resp:saved},{status:200})
      }
      if(!saved){
        return NextResponse.json({message:"Failed To Add Task"},{status:200})
      }
     }
     catch(err){
        console.log(err);
        return NextResponse.json({message:"Internal Server Error"},{status:500})
     }
}

// export const GET =async(req)=>{
//   await DATABASE_CONNECTION();

//   try{
//       const respData = await NewTodo.find();
//       // console.log("response",respData)
//        if(respData){

//          return NextResponse.json({message:"Data Fetched Successfully",resp:respData},{status:200})
//        }
//        if(!respData){
//         return NextResponse.json({message:"Failed To Fetched Data"},{status:200})
//        }
//   }
//   catch(err){
//     console.log(err)
//     return NextResponse.json({message:"Internal Server Error"},{status:500})
//   }
// }