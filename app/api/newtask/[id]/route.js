import DATABASE_CONNECTION from "@/app/config/connection"
import NewTodo from "@/app/models/newTaskModel";
import { NextResponse } from "next/server";

export const DELETE = async(req,{params})=>{
    await DATABASE_CONNECTION();
    try{
        // console.log("params",params.id)
        const respData = await NewTodo.deleteOne({_id:params.id})
        if(respData){
            return NextResponse.json({message:"Deleted Successfully",resp:respData},{status:200})
        }
        if(!respData){
            return NextResponse.json({message:"Failed To Delete Task"},{status:200})
        }

    }
    catch(err){
        console.log(err)

        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}