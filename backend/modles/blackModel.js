import mongoose from "mongoose";


const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in blacklist"]
    }
},{timestamps:true})

export const tokenBlockListModel=mongoose.model("blacklisttoken",blackListTokenSchema)