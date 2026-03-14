import getServerTime from "./getserverTime.service"
import generateSignature from "./signature.service"
import axios from 'axios'

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
            `${BINANCE_BASE_URL}/api/v3/order?${queryString}&signature=${signature}`,
            null,
            { headers: { 'X-MBX-APIKEY': BINANCE_API_KEY } }
        )

        if (response.data.status == 'FILLED') {
// save to db


        }
        console.log(response.data);


    } catch (error: any) {
        console.error("Binance error:", error.response?.data || error.message)
        throw error
    }
}

export default placeMarketOrder