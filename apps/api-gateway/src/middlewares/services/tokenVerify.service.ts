import JWT from "jsonwebtoken"

const verifytoken = (token:string) =>{
 return JWT.verify(token,process.env.JWT_SECRET!)
}

export default verifytoken