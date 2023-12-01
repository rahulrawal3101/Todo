import { MONGO_URL } from "@/constant";
import mongoose from "mongoose";

let connected;
const DATABASE_CONNECTION =async()=>{
  if(!connected){
    connected =await mongoose.connect(MONGO_URL)
}
console.log("Data Base Connected")
  return connected;
}

export default DATABASE_CONNECTION;

