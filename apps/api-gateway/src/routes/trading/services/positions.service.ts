import { NextFunction, Request, Response } from "express"
import { AppError } from "../../../utils/AppError"
import { sendSuccess } from "../../../utils/ResponseHandler"
import { prisma } from "@crypto/database";


const getPositions = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = req.user?.id

        if (!userId) {
            next(new AppError("Unauthorized", 401))
            return
        }


        const filledOrders = await prisma.orderEvent.findMany({
            where: {
                userId,
                status: "FILLED"
            }

        })

        console.log(filledOrders);


        const calculateNetPositions = (filledPositions: typeof filledOrders) => {


            const netPositions: Record<string, {
                symbol: string,
                quantity: number,
                price: number,
                side: string

            }> = {}
            for (const order of filledPositions) {
                if (!netPositions[order.symbol]) {
                    netPositions[order.symbol] = {
                        symbol: order.symbol,
                        quantity: order.quantity,
                        side: order.side,
                        price: order.price ?? 0
                    }
                }

                if (order.side === 'BUY') {
                    netPositions[order.symbol].quantity += order.quantity

                } else {
                    netPositions[order.symbol].quantity -= order.quantity
                }
            }
            return netPositions
        }
        const resultpositions = calculateNetPositions(filledOrders)
        console.log(resultpositions);


        const filteredNetPositions = Object.values(resultpositions).filter(p => p.quantity > 0)
        console.log("filtered", filteredNetPositions);



        sendSuccess(res, filteredNetPositions, 200)
    } catch (error) {
        next(error)
    }

}

export default getPositions