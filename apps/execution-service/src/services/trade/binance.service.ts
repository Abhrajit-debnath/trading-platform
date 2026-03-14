import getServerTime from "./getserverTime.service"
import generateSignature from "./signature.service"
import axios from 'axios'
import { prisma } from "@crypto/database"

export interface orderDetailsType {
    orderId: string
    userId: string
    symbol: string
    side: string
    type: string
    quantity: number
}

const BINANCE_BASE_URL = process.env.BINANCE_BASE_URL
const BINANCE_API_KEY = process.env.BINANCE_API_KEY
const BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY

if (!BINANCE_BASE_URL || !BINANCE_API_KEY || !BINANCE_SECRET_KEY) {
    throw new Error("Missing Binance environment variables")
}
console.log(BINANCE_API_KEY);


const placeMarketOrder = async (orderDetails: orderDetailsType) => {
    const timestamp = await getServerTime(BINANCE_BASE_URL)
    console.log(timestamp);

    const { symbol, side, quantity } = orderDetails

    const queryString = `symbol=${symbol}&side=${side}&type=MARKET&quantity=${quantity}&timestamp=${timestamp}`

    const signature = generateSignature(queryString, process.env.BINANCE_SECRET_KEY!)
    console.log("signature:", signature)

    try {
        const response = await axios.post(
            `${BINANCE_BASE_URL}/api/v3/order?${queryString}&signature=${signature + '9'}`,
            null,
            { headers: { 'X-MBX-APIKEY': BINANCE_API_KEY } }
        )


        const data = response.data

        const status = data.status


        await prisma.orderCommand.update




    } catch (error: any) {
        const binanceError = error.response?.data
        return {
            success: false,
            status: "REJECTED",
            reason: binanceError?.msg ?? error
        }
    }
}

export default placeMarketOrder