
import express, { Express, Request, Response } from "express"
import authRouter from "./routes/index"
import errorHandler from "./utils/ErrorHandler"
import cookieParser from "cookie-parser"
import authMiddleware from "./middlewares/auth.middleware"
import { connectRedis } from "./lib/redis"
import TradeRouter from "./routes/index"
import { env } from "@crypto/database"


const app: Express = express()
const PORT = env.PORT


// Redis connect
connectRedis()



// Middleware
app.use(express.json())
app.use(cookieParser())

// Routes

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/trading/orders", authMiddleware, TradeRouter)


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


