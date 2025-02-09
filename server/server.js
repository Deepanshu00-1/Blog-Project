import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import ConnectDB from "./db.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ['http://localhost:5173']

app.use(cors({origin: allowedOrigins ,credentials: true}));
app.use(express.json());
app.use(cookieParser());

ConnectDB();

// API Endpoints
app.get("/", (req,res)=>{
    res.send("API Working")
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter);
app.use("/api/blog", blogRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
