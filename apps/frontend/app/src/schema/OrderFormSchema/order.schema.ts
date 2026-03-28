import z from "zod"

const numberField =
    z.number({ message: "Input must be a number" })
    ;

export const combinedOrderSchema = z.object({
    limitPrice: numberField.optional(),
    stopPrice: numberField.optional(),
    quantity: numberField,
});

export type orderFormData = z.infer<typeof combinedOrderSchema>

