// routes/trading.ts
import { Router } from 'express'
import tradeOrder from './services/order.service'

const router : Router = Router()
router.post("/", tradeOrder)

export default router