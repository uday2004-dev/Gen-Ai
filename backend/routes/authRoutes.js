import express from "express"
import {  userLogin, userResgister,userLogout } from "../controllers./authController.js"

const authRouter = express.Router()


authRouter.post("/register",userResgister)
authRouter.post("/login",userLogin)


authRouter.get("logout",userLogout)

export default authRouter