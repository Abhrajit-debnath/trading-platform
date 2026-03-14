import JWT from "jsonwebtoken"

interface TokenPayload {

    id: string
    email: string

}

const verifytoken = (token: string) => {
    return JWT.verify(token, process.env.JWT_SECRET!) as TokenPayload
}

export default verifytoken