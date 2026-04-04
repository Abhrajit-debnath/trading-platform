import { NextFunction, Request, Response } from "express"
import { sendSuccess } from "../../../utils/ResponseHandler"



const logoutUser = async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("token")

    sendSuccess(res, {
        success: true
    }, 200)



}

export default logoutUser