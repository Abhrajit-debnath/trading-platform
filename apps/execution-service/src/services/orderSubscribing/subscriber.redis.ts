import { pub } from "../../lib/redis";
import {sub} from "../../lib/redis"
import placeMarketOrder from "../trade/binance.service";
import { orderDetailsType } from "../trade/binance.service";

const fetchOrderData = async () => {

    try {
        sub.subscribe("commands:order:submit", async (orderDetails) => {
            console.log(orderDetails);

            const order: orderDetailsType = JSON.parse(orderDetails)
            console.log(order);
            
            const orderResponse = await placeMarketOrder(order)

            await pub.publish("events:order:status", JSON.stringify({
                orderId: order.orderId,
                userId: order.userId,
                status: orderResponse.status,
                symbol: order.symbol,
                side: order.side,
                quantity: order.quantity,
                price: orderResponse.success ? orderResponse.data.fills?.[0]?.price ?? 0 : 0,
                timeStamp: new Date().toISOString(),

            }))

        })



    } catch (error: any) {
        console.error("Subscriber error:", error.message)

    }

}

export default fetchOrderData