import { NextFunction, Request, Response } from "express"
import { loginSchema } from "../schema/login.schema"
import { AppError } from "../../../utils/AppError"
import { prisma } from "@crypto/database"
import generateToken from "./token.service"
import { sendSuccess } from "../../../utils/ResponseHandler"
import verifyPassword from "./verifyPassword.service"



const loginUser = async (req: Request, res: Response, next: NextFunction) => {


    const parseResult = loginSchema.safeParse(req.body)


    if (!parseResult.success) {
        next(new AppError("Validation failed", 400))
        return
    }

    try {

        const { email, password, } = parseResult.data


        // Password verification




        const user = await prisma.user.findUnique(
            {
                where: { email }
            }
        )



        if (!user) {
            next(new AppError("Invalid Credentials", 401))
            return
        }

        const isPasswordValid = await verifyPassword(password, user.password)



        if (!isPasswordValid) {
            next(new AppError("Invalid Credentials", 401))
            return
        }


        const token = generateToken(user.id, user.email)


        // setting httpOnly cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        sendSuccess(res, {
            message: "User loggedIn successfully",
            data: {
                email: user.email,
            }
        }, 200)

    } catch (error) {
        next(error)
    }


}

export default loginUser