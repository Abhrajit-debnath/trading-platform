import crypto, { BinaryLike } from "crypto"



const generateSignature = (query: BinaryLike, secretKey: string) => {
    return crypto.createHmac("SHA256", secretKey).update(query).digest("hex")

}


export default generateSignature