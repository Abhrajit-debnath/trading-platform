import { env } from "@crypto/database"
import { createClient } from "redis"

const pub = createClient({
    url: env.REDIS_URL
})


pub.on("error", (err) => console.error("Redis error:", err))
pub.on("connect", () => {
    console.log("Redis connected ✅")
})

export const connectRedis = async () => {
    await pub.connect()
}

export default pub
