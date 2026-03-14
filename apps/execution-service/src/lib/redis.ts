import { createClient } from "redis"

const sub = createClient({
    url: process.env.REDIS_URL!
})


sub.on("error", (err) => console.error("Redis error:", err))
sub.on("connect", () => {
    console.log("Redis connected ✅")
})

export const connectRedis = async () => {
    await sub.connect()
}

export default sub
