// import getServerTime from "./getserverTime.service"
// import generateSignature from "./signature.service"
// import axios from 'axios'
// import { env } from "@crypto/database"
// import { sendSuccess } from "../../utils/ResponseHandler"
// import { Response, Request, NextFunction } from "express"

// const accountService = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const timestamp = await getServerTime(env.BINANCE_BASE_URL)
//         const queryString = `timestamp=${timestamp}`
//         const signature = generateSignature(queryString, env.BINANCE_SECRET_KEY)
//         const response = await axios.get(
//             `${env.BINANCE_BASE_URL}/api/v3/account?${queryString}&signature=${signature}`,
//             { headers: { 'X-MBX-APIKEY': env.BINANCE_API_KEY } }
//         )


//         sendSuccess(res, response.data, 200)
//     } catch (error: any) {
//         next(error)
//     }
// }

// export default accountService