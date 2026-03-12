import { Router } from 'express'
import registerRouter from './auth/register'
import loginRouter from "./auth/login"
import buyRouter from "./trading/buyCommand"

const router: Router = Router()

router.use("/register", registerRouter)
router.use("/login", loginRouter)

router.use("/buy",buyRouter)


export default router