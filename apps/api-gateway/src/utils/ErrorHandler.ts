import { AppError } from "./AppError";


import { Request, Response, NextFunction } from "express";



const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction

) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message
        })
        return
    }
    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    })
}

export default errorHandler



