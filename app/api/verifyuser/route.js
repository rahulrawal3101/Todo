import DATABASE_CONNECTION from "@/app/config/connection"
import ToDoUser from "@/app/models/toDoUserModel";
import { NextResponse } from "next/server";

export const POST =async(req)=>{
      await DATABASE_CONNECTION();
      try{
        const body = await req.json();
        // console.log("verify user",body)
        const resp = await ToDoUser.findOne({email:body.email})
        // console.log("resp verify",resp)
        if(resp){
            if(resp.password == body.password){
                return NextResponse.json({message:"Login Verified",resp:{tid:resp._id}},{status:200})
            }
            else{
                return NextResponse.json({message:"Wrong Password"},{status:200})
            }
        }
        if(!resp){
                return NextResponse.json({message:"This Email is Not Registered With Us"},{status:200})
        } 
      }
      catch(err){
        console.log(err)
        return NextResponse.json({message:"Internal Server Error"},{status:500})
      }
}