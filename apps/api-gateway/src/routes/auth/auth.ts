// routes/auth.ts
import { Router } from 'express'
import registerRouter from './register'
import loginRouter from './login'
import logoutRouter from './logout'


const router : Router = Router()
router.use("/register", registerRouter)
router.use("/login", loginRouter)
router.use("/logout", logoutRouter)

export default router