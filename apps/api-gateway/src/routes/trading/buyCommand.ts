import express, { Router } from 'express'
import buyOrder from '../auth/services/trading/buyOrder.service'

const router: Router = express.Router()

// Route

router.post("/",buyOrder)

export default router
