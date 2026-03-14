import * as z from 'zod'

export const orderSchema = z.object({
    symbol: z.string(),
    side: z.string(),
    type: z.string(),
    quantity: z.number()


})

