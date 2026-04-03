// routes/trading.ts
import { Router } from 'express'
import tradeOrder from './services/order.service'
import getPositions from "./services/positions.service"
import getOrders from './services/orders.service'


const router: Router = Router()
router.post("/orders", tradeOrder)
router.get("/orders", getOrders)
router.get("/positions", getPositions)

export default router