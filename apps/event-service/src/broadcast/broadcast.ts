import { io } from "../lib/webSocket"


interface orderStatusType {
    orderId: string
    userId: string
    symbol: string
    side: string
    quantity: number
    price: string
    timeStamp: Date
}


const broadcastTouser = async (userId: string, event: string, orderStatus: orderStatusType) => {

    io.to(userId).emit(event, orderStatus)

}

export default broadcastTouser