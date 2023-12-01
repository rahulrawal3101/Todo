import mongoose from "mongoose"

const newTaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    tid:{
        type:String,
        required:true
    },
    importance:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:false,
        default:false
    }
},{timestamps:true});

export default newTaskSchema;