import axios from "axios"

const getServerTime = async (baseUrl: string): Promise<number> => {
    const response = await axios.get(`${baseUrl}/api/v3/time`)
    return response.data.serverTime
}

export default getServerTime