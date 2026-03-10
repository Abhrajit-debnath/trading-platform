import Jwt from "jsonwebtoken"

const generateToken = (id: string, email: string) => {
    return Jwt.sign(
        { id, email },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    )
}

export default generateToken