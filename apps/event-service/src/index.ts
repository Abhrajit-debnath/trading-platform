import express from "express"
import { env } from "@crypto/database"
import { createServer } from "http"
import initSocket from "./lib/webSocket";
import { connectRedis } from "./lib/redis";
import getOrderStatus from "./broadcast/subscriber.redis";


const app = express()



const httpServer = createServer(app)

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

    httpServer.listen(env.EVENT_SERVICE_PORT, () => {
        console.log(`🚀 Event service running on port ${env.EVENT_SERVICE_PORT}`)
    })
}

start()











