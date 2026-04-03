import { z } from "zod"

const numberField = z.coerce
    .number({ message: "Input must be a number" })
    .min(0.0001, "Minimum quantity is 0.0001")

export const combinedOrderSchema = z.object({
    limitPrice: numberField.optional(),
    stopPrice: numberField.optional(),
    quantity: numberField,
})

export type orderFormData = z.infer<typeof combinedOrderSchema>