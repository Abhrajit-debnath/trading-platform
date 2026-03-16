import redis from "../lib/redis";
import { io } from "../lib/webSocket";
import broadcastTouser from "./broadcast";

interface orderStatusType {
    orderId: string
    userId: string
    symbol: string
    side: string
    quantity: number
    price: number
    timeStamp: Date,
}


const getOrderStatus = async () => {

    try {
        redis.subscribe("events:order:status", async (orderDetails) => {

            const orderStatus: orderStatusType = JSON.parse(orderDetails)
            if (orderStatus) {

                broadcastTouser(orderStatus.userId, "ORDER_UPDATE", orderStatus)


            }

        })



    } catch (error: any) {
        console.error("Subscriber error:", error.message)

    }

}

export default getOrderStatus