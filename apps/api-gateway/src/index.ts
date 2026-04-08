
import express, { Express, Request, Response } from "express"
import authRouter from "./routes/auth/auth"
import errorHandler from "./utils/ErrorHandler"
import cookieParser from "cookie-parser"
import authMiddleware from "./middlewares/auth.middleware"
import { connectRedis } from "./lib/redis"
import TradeRouter from "./routes/trading/trading"
// import AccountRouter from "./routes/account/router"
import { env } from "@crypto/database"
import cors from "cors"




const app: Express = express()
const PORT = env.PORT

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true

}

app.use(cors(corsOptions))


// Redis connect
connectRedis()



// Middleware
app.use(express.json())
app.use(cookieParser())

// Routes

app.use("/api/auth/", authRouter)
app.use("/api/trading/", authMiddleware, TradeRouter)
// app.use("/api/account/", authMiddleware, AccountRouter)

// Health check
app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "ok"
    })
})



// global error middleware 

app.use(errorHandler)

app.listen(PORT, () => {
    console.log("API Gateway running on port", PORT);

})

export default app


