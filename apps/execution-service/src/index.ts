
import { connectRedis } from "./lib/redis";
import fetchOrderData from "./services/orderSubscribing/subscriber.redis";


// Connect to redis

const start = async () => {
    await connectRedis()
    fetchOrderData()
}


//

start()





