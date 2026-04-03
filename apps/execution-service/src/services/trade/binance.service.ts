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
    price?: number,
    stopPrice?: number,
    quantity: number
}




const placeMarketOrder = async (orderDetails: orderDetailsType) => {
    const timestamp = await getServerTime(env.BINANCE_BASE_URL)


    const { symbol, side, quantity, orderId, type, price, stopPrice } = orderDetails


    let queryString = `symbol=${symbol}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`

    if (type === 'LIMIT') {
        queryString += `&price=${price}&timeInForce=GTC`
    }

    if (type === 'STOP_LOSS') {
        queryString += `&stopPrice=${stopPrice}`
    }

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
                status,
            }
        })


        console.log(orderCommand);

        return {
            success: true,
            status,
            data,

        }




    } catch (error: any) {
        const binanceError = error.response?.data
        console.error('Binance error:', JSON.stringify(binanceError, null, 2))


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