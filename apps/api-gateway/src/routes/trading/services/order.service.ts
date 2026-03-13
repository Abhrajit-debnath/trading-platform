import { NextFunction, Request, Response } from "express"
import redis from "../../../lib/redis"
import { orderSchema } from "../schema/order.schema"
import { AppError } from "../../../utils/AppError"
import { sendSuccess } from "../../../utils/ResponseHandler"

const tradeOrder = async (req: Request, res: Response, next: NextFunction) => {


    const parsedResult = orderSchema.safeParse(req.body)

    if (!parsedResult.success) {
        next(new AppError("Validation failed", 400))
        return
    }

    const { userId } = parsedResult.data


    const orderDetails = {
        userId
    }

    try {
        await redis.publish("commands:orders:submit", JSON.stringify(orderDetails))


        sendSuccess(res, {
            status: 'PENDING'
        }, 202)
    } catch (error) {
        next(error)
    }

}


export default tradeOrder