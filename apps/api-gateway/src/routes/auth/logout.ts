import express, { Router } from 'express'
import logoutUser from './services/logout.service'

const router: Router = express.Router()

// Route

router.post("/", logoutUser)

export default router
