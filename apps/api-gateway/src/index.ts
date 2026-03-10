import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import authRouter from "./routes/auth"
import errorHandler from "./utils/ErrorHandler"

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())

// Routes

app.use("/api/v1/auth", authRouter)



// global error middleware 

app.use(errorHandler)

// Health check
app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "ok"
    })
})

app.listen(PORT, () => {
    console.log("server running on port", PORT);

})

export default app


