import DATABASE_CONNECTION from "@/app/config/connection"
import ToDoUser from "@/app/models/toDoUserModel";
import { NextResponse } from "next/server";

export const POST =async(req)=>{
   await DATABASE_CONNECTION();
   try{
       const body = await req.json();
       console.log(body)
       const {confirmPassword,...data}=body
       const newBody = data
       console.log("new body",newBody)
      const isUserExist = await ToDoUser.findOne({email:body.email});
       
         console.log('isUserExist',isUserExist)
      if(isUserExist){
         console.log("already registered")
         return NextResponse.json({message:"This Email is Already Registered"},{status:200})
      }
      if(!isUserExist){
         const toSave = await ToDoUser(newBody);
         console.log('tosave',toSave)
         const saved = await toSave.save();
         console.log("saved body",saved)
         if(saved){
            return  NextResponse.json({message:"Successfully Registered"},{status:200})
         }
         if(!saved){
           return  NextResponse.json({message:"Registration Failed"},{status:200})
         }
        
      }
    }
   catch(err){
    console.log(err);
    return NextResponse.json({message:"Internal Server Error"},{status:500})
   }
}