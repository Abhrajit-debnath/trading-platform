import { createClient , RedisClientType } from "redis"

const redis : RedisClientType = createClient({
    url: process.env.REDIS_URL!
})

redis.on("error", (err) => console.error("Redis error:", err))
redis.on("connect", () => console.log("Redis connected ✅"))




export const connectRedis = async () => {
    await redis.connect()
}

export default redis