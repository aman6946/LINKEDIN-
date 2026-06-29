import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import connectDB from "./config/db.js"
import cors from "cors"

dotenv.config()   //Initialize dotenv

let app = express()

let port = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)


app.get("/",(req,res) => {
    res.send("hello");
})
app.listen(port, () => {
    connectDB();
    console.log("server started");
})
