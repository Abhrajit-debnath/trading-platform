import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import verifytoken from "./services/tokenVerify.service";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.token

    if (!token) {
        next(new AppError("Unauthorized", 401))
        return
    }
    try {
        const decoded = verifytoken(token)
        req.user = decoded
        next()
    } catch (error) {
        next(new AppError("Invalid token", 401))
    }
}

export default authMiddleware