import dotenv from 'dotenv'
import path from 'path'




import { PrismaClient } from './database/generated'
import { PrismaNeon } from '@prisma/adapter-neon'
const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({ adapter })