import { Server } from "socket.io"
import type { Server as HTTPserver } from "http"
import JWT, { JwtPayload } from "jsonwebtoken"

let io: Server


const initSocket = (httpServer: HTTPserver) => {
    io = new Server(httpServer, {
        cookie: true,
        cors: {
            origin: ["http://localhost:3000", "http://localhost:5500"],
            methods: ["GET", "POST"],
            credentials: true
        }
    })


    io.use((socket, next) => {
        try {
            const token = socket.handshake.headers.cookie?.split(";").find((c => c.trim().startsWith("token=")))?.split("=")[1]
            if (!token) {
                throw new Error("Unauthorized")
            }
            const decoded = JWT.verify(token, process.env.JWT_SECRET!) as JwtPayload
            socket.data.userId = decoded.id
            next()
        } catch (error) {
            next(new Error("Unauthorized"))
        }
    })

    io.on("connection", (socket) => {
        const userId: string = socket.data.userId
        socket.join(userId)


        socket.on("disconnect", () => {
            console.log(`❌ User ${userId} disconnected`)
        })
    })

}


export { io }

export default initSocket
