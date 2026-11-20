import express from "express"
import { authUser } from "../middlewares/authMiddleware.js"
import { generateInterviewReport } from "../services/aiService.js"

 const interviewRouter=express.Router()


interviewRouter.post("/",authUser,generateInterviewReport)


export default interviewRouter