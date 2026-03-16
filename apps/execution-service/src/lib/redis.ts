import { env } from "@crypto/database"
import { createClient } from "redis"


export const sub = createClient({
    url: env.REDIS_URL
})

export const pub = createClient({
    url: env.REDIS_URL
})


sub.on("error", (err) => console.error("Redis error:", err))
sub.on("connect", () => {
    console.log("Redis connected ✅")
})

export const connectRedis = async () => {
    await sub.connect()
    await pub.connect()
}

