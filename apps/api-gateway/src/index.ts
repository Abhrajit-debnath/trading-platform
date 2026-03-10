import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import authRouter from "./routes/auth"
import errorHandler from "./utils/ErrorHandler"
import cookieParser from "cookie-parser"
import authMiddleware from "./middlewares/auth.middleware"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())
app.use(cookieParser())

// Routes

app.use("/api/v1/auth", authRouter)


// Health check
app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "ok"
    })
})



// global error middleware 

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("server running on port", PORT);

})

export default app


