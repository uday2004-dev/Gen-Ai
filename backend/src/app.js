import express from "express"
import authRouter from "../routes/authRoutes.js"
import cookieparser from "cookie-parser"
import cors from "cors"
const app = express()


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieparser())

app.use("/api/auth", authRouter)

export default app