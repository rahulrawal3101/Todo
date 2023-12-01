
import mongoose from "mongoose";
import userSchema from "../schemas/userSchema";

const ToDoUser = mongoose.models.ToDoUser || new mongoose.model('ToDoUser',userSchema);


export default ToDoUser;