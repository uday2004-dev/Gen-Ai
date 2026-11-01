import express from "express"
import {  userLogin, userResgister,userLogout, getMeController } from "../controllers./authController.js"
import { authUser } from "../middlewares/authMiddleware.js"

const authRouter = express.Router()


authRouter.post("/register",userResgister)
authRouter.post("/login",userLogin)
authRouter.get("/logout",userLogout)
authRouter.get("/get-me",authUser,getMeController)

export default authRouter