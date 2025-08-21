import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"

const app = express()

dotenv.config()
const PORT = process.env.PORT || 8000

app.get("/heathcheck", (req, res) => {
    res.send("Healthy")
})

connectDB()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})