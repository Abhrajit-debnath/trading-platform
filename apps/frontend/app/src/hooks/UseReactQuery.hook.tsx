import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { axiosconfg } from '../config/axios.config'
import { useAppSelector } from '@/app/hook'

const UseReactQuery = (queryString: string, name: string) => {
    const lastOrderEvent = useAppSelector((state) => state.lastOrderEvent.value)


    const { data, isLoading } = useQuery({
        queryKey: [name, lastOrderEvent, queryString],
        queryFn: async () => {
            const res = await axios.get(queryString, axiosconfg)
            return res.data
        },
    })

    return [data,isLoading]
}
export default UseReactQuery
