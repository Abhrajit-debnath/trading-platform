import { Router } from 'express'
import registerRouter from './register'

const router: Router = Router()

router.use("/register", registerRouter)


export default router