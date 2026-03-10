import { NextFunction, Request, Response } from "express"
import { registerSchema } from "../schema/register.schema";
import { AppError } from "../../../utils/AppError";
import { prisma } from "../../../lib/prisma";




const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    const parseResult = registerSchema.safeParse(req.body)

    console.log(parseResult);


    if (!parseResult.success) {
        next(new AppError("Validation failed", 400))
        return
    }

    try {

        const { email, password, binanceApiKey, binanceSecretKey } = parseResult.data

        const user = await prisma.user.create({
            data: {
                email,
                password,
                binanceApiKey,
                binanceSecretKey
            }
        })

        console.log(user);



    } catch (error) {
        next(error)
    }
}


export default registerUser