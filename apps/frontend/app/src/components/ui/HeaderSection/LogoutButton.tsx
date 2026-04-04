'use client'
import { axiosconfg } from '@/app/src/config/axios.config'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = async() => {
       try {
        const response = await axios.post("/api/auth/logout","",axiosconfg)
        if (response.status === 200) {
            router.replace("/auth/login")
            toast.success("User logged out sucessfully")
        }
        
        
       } catch (error) {
        toast.error("Something went wrong")
       }
        
    }

    return (
        <button onClick={handleLogout} className='bg-red-500 rounded-xl capitalize cursor-pointer text-white px-5 py-1 font-medium'>
            logout
        </button>
    )
}

export default LogoutButton