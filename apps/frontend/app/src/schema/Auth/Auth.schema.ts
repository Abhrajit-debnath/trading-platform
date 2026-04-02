import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const RegisterSchema = LoginSchema.extend({
    binance_api_Key: z.string().min(1, "API key is required"),
    binance_secret_Key: z.string().min(1, "Secret key is required"),
})

export type LoginPayload = z.infer<typeof LoginSchema>
export type RegisterPayload = z.infer<typeof RegisterSchema>