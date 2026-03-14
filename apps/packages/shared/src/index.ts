import dotenv from 'dotenv'
dotenv.config({
    path : "../../.env"
})


const required = [
    'DATABASE_URL',
    'REDIS_URL',
    'JWT_SECRET',
    'BINANCE_BASE_URL',
    'BINANCE_API_KEY',
    'BINANCE_SECRET_KEY'
]


for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`)
    }
}


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
    BINANCE_API_KEY: process.env.BINANCE_API_KEY!,
    BINANCE_SECRET_KEY: process.env.BINANCE_SECRET_KEY!,

    // App
    PORT: process.env.PORT || '3000',
    NODE_ENV: process.env.NODE_ENV || 'development',

}

import { PrismaClient } from './database/generated'
import { PrismaNeon } from '@prisma/adapter-neon'
const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({ adapter })