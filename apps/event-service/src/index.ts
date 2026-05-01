import dotenv from "dotenv"
dotenv.config()
import cors from "cors"

import express from "express"
import { createServer } from "http"
import initSocket from "./lib/webSocket";
import { connectRedis } from "./lib/redis";
import getOrderStatus from "./broadcast/subscriber.redis";


const app = express()



const httpServer = createServer(app)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(express.json())

const start = async () => {
    await connectRedis()
    initSocket(httpServer)
    await getOrderStatus()

    app.get("/health", (req, res) => {
        res.json({
            status: "ok"
        })
    })

    httpServer.listen(process.env.EVENT_SERVICE_PORT, () => {
        console.log(`🚀 Event service running on port ${process.env.EVENT_SERVICE_PORT}`)
    })
}

start()











