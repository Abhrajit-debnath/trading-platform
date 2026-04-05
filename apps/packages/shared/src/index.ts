import dotenv from 'dotenv'
import path from 'path'
const envPath = path.resolve(__dirname, '../../../../.env')
dotenv.config({ path: envPath })


export const env = {
    // Database
    DATABASE_URL: process.env.DATABASE_URL!,
    DIRECT_URL: process.env.DIRECT_URL!,

    // Redis
    REDIS_URL: process.env.REDIS_URL!,

    // JWT
    JWT_SECRET: process.env.JWT_SECRET!,

    // Binance
    BINANCE_BASE_URL: process.env.BINANCE_BASE_URL!,

    // App
    PORT: process.env.PORT,
    EVENT_SERVICE_PORT: process.env.EVENT_SERVICE_PORT || 8081,
    NODE_ENV: process.env.NODE_ENV || 'development',

}




import { PrismaClient } from './database/generated'
import { PrismaNeon } from '@prisma/adapter-neon'
const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({ adapter })