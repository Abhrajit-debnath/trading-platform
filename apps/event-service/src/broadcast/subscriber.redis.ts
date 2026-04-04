import redis from "../lib/redis";
import broadcastTouser from "./broadcast";
import { prisma } from "@crypto/database"

interface orderStatusType {
    orderId: string
    userId: string
    symbol: string
    side: string
    quantity: number
    status: string
    price: string
    timeStamp: Date
}


const getOrderStatus = async () => {

    try {
        redis.subscribe("events:order:status", async (orderDetails) => {

            const orderStatus: orderStatusType = JSON.parse(orderDetails)
            console.log(orderStatus);
            

            if (orderStatus) {
                const orderEvent = await prisma.orderEvent.create({
                    data: {
                        userId: orderStatus.userId,
                        symbol: orderStatus.symbol,
                        orderId: orderStatus.orderId,
                        side: orderStatus.side,
                        quantity: orderStatus.quantity,
                        status: orderStatus.status,
                        price: parseFloat(orderStatus.price),
                        timeStamp: orderStatus.timeStamp,
                    }
                })

                console.log(orderEvent);
                

                broadcastTouser(orderStatus.userId, "ORDER_UPDATE", orderStatus)


            }

        })



    } catch (error: any) {
        console.error("Subscriber error:", error.message)

    }

}

export default getOrderStatus