import mongoose from "mongoose"
import newTaskSchema from "../schemas/newTaskSchema"

const NewTodo = mongoose.models.NewTodo || new mongoose.model('NewTodo',newTaskSchema)

export default NewTodo;