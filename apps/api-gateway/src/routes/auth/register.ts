import express, { Router } from 'express'
import registerUser from './services/register.service'

const router: Router = express.Router()

// Route

router.post("/", registerUser)

export default router
