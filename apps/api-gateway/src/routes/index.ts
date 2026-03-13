import { Router } from 'express'
import registerRouter from './auth/register'
import loginRouter from "./auth/login"
import tradeRouter from "./trading/tradeOrder"

const router: Router = Router()

router.use("/register", registerRouter)
router.use("/login", loginRouter)

router.use("/buy",tradeRouter)


export default router