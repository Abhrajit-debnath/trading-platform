import getServerTime from "./getserverTime.service"
import generateSignature from "./signature.service"
import axios from 'axios'
import { prisma } from "@crypto/database"

import { env } from "@crypto/database"

export interface orderDetailsType {
    orderId: string
    userId: string
    symbol: string
    side: string
    type: string
    quantity: number
}




const placeMarketOrder = async (orderDetails: orderDetailsType) => {
    const timestamp = await getServerTime(env.BINANCE_BASE_URL)
    console.log(timestamp);

    const { symbol, side, quantity, orderId } = orderDetails

    const queryString = `symbol=${symbol}&side=${side}&type=MARKET&quantity=${quantity}&timestamp=${timestamp}`

    const signature = generateSignature(queryString, env.BINANCE_SECRET_KEY)

    try {
        const response = await axios.post(
            `${env.BINANCE_BASE_URL}/api/v3/order?${queryString}&signature=${signature}`,
            null,
            { headers: { 'X-MBX-APIKEY': env.BINANCE_API_KEY } }
        )
        const data = response.data

        const status = data.status


        const orderCommand = await prisma.orderCommand.update({
            where: {
                orderId
            }, data: {
                status
            }
        })
      


        return {
            success: true,
            status,
            data

        }




    } catch (error: any) {
        const binanceError = error.response?.data


        await prisma.orderCommand.update({
            where: { orderId },
            data: { status: "REJECTED" }
        })
        return {
            success: false,
            status: "REJECTED",
            reason: binanceError?.msg ?? error.message
        }
    }
}

export default placeMarketOrder