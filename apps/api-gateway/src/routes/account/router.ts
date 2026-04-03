import express, { Router } from 'express'
import AccountService from './account.service'

const router: Router = express.Router()

// Route

router.get("/", AccountService)

export default router
