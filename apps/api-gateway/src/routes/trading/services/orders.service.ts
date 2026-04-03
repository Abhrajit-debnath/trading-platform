import { NextFunction, Request, Response } from "express"
import { AppError } from "../../../utils/AppError"
import { sendSuccess } from "../../../utils/ResponseHandler"
import { prisma } from "@crypto/database";

const getOrders = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = req.user?.id

        if (!userId) {
            next(new AppError("Unauthorized", 401))
            return
        }


        const positions = await prisma.orderEvent.findMany({
            where: {
                userId,
            }

        })

        sendSuccess(res, positions, 200)
    } catch (error) {
        next(error)
    }

}

export default getOrders