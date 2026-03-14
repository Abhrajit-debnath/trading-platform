import subClient from "../../lib/redis"
import placeMarketOrder from "../trade/binance.service";
import { orderDetailsType } from "../trade/binance.service";

const fetchOrderData = async () => {

    try {
        subClient.subscribe("commands:order:submit", (orderDetails) => {
            console.log(orderDetails);

            const order: orderDetailsType = JSON.parse(orderDetails)
            placeMarketOrder(order)

        })


    } catch (error) {
        console.log(error);

    }

}

export default fetchOrderData