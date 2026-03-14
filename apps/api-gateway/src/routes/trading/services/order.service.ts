import { NextFunction, Request, Response } from "express"
import redis from "../../../lib/redis"
import { orderSchema } from "../schema/order.schema"
import { AppError } from "../../../utils/AppError"
import { sendSuccess } from "../../../utils/ResponseHandler"
import { prisma } from "../../../lib/prisma";
import { v4 as uuidv4 } from 'uuid';

const tradeOrder = async (req: Request, res: Response, next: NextFunction) => {


    const parsedResult = orderSchema.safeParse(req.body)

    if (!parsedResult.success) {
        next(new AppError("Validation failed", 400))
        return
    }

    console.log(parsedResult);


    const { symbol, side, type, quantity } = parsedResult.data




    try {
        const userId = req.user?.id

        if (!userId) {
            next(new AppError("Unauthorized", 401))
            return
        }


        const orderId = uuidv4()


        const order = await prisma.orderCommand.create({
            data: {
                userId,
                orderId,
                symbol,
                quantity,
                type,
                side,
                status: "PENDING"
            }
        })

        await redis.publish("commands:order:submit", JSON.stringify({
            orderId: order.orderId,
            symbol,
            side,
            type,
            quantity,
            userId,
            timeStamp: order.createdAt.toISOString()
        }))
        sendSuccess(res, {
            orderId: order.orderId,
            status: 'PENDING'
        }, 202)
    } catch (error) {
        next(error)
    }

}


export default tradeOrder