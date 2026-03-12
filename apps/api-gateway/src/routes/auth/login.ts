import express, { Router } from 'express'
import loginUser from './services/auth/login.service'

const router: Router = express.Router()

// Route

router.post("/", loginUser)

export default router
