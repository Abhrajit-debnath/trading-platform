import { NextFunction, Request, Response } from "express"
import { registerSchema } from "../schema/register.schema";
import { AppError } from "../../../utils/AppError";
import { prisma } from "@crypto/database";
import { sendSuccess } from "../../../utils/ResponseHandler";
import hashPassword from "./hash.service";
import generateToken from "./token.service";


const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    const parsedResult = registerSchema.safeParse(req.body)


    if (!parsedResult.success) {
        next(new AppError("Validation failed", 400))
        return
    }

    try {

        const { email, password, binanceApiKey, binanceSecretKey } = parsedResult.data


        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            next(new AppError("User already exists", 409))
            return
        }



        const user = await prisma.user.create({
            data: {
                email,
                password: await hashPassword(password),
                binanceApiKey,
                binanceSecretKey
            }
        })

        const token = generateToken(user.id, user.email)


        // setting httpOnly cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        sendSuccess(res, {
            message: "User registered successfully",
            token,

        }, 201)

    } catch (error) {
        next(error)
    }
}


export default registerUser