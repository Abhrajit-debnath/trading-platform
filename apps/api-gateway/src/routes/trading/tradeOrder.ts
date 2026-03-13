import express, { Router } from 'express'
import tradeOrder from './services/order.service'

const router: Router = express.Router()

// Route

router.post("/",tradeOrder)

export default router
