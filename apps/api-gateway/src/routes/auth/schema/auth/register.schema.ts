import * as z from 'zod'

export const registerSchema = z.object({
    email: z.string(),
    password: z.string(),
    binanceApiKey: z.string(),
    binanceSecretKey: z.string()
})

