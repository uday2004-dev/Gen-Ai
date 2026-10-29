import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        unique:[true,"username already taken"],
        required:true

    },
    email:{
        type:String,
        unique:[true,"email already registereds"],
        required:true
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

export const userModel=mongoose.model("Users",userSchema)