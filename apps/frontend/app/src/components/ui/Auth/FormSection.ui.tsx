'use client'

import { LoginPayload, LoginSchema, RegisterPayload, RegisterSchema } from '@/app/src/schema/Auth/Auth.schema'
import type { AuthFormProps as FormSectionProps } from './AuthForm.ui'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { axiosconfg } from '@/app/src/config/axios.config'


const FormSection = ({ fields, state }: FormSectionProps) => {



    const authSchema = state === 'login' ? LoginSchema : RegisterSchema

    const router = useRouter()


    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(state === 'login' ? LoginSchema : RegisterSchema),
    })


    useEffect(() => {
        reset()

    }, [state])


    const onSubmit = async (data: z.infer<typeof authSchema>) => {
        try {


            if (state === 'login') {
                const { email, password } = data as LoginPayload
                const response = await axios.post(
                    `${axiosconfg.baseURL}/api/auth/login`,
                    { email, password },
                    axiosconfg
                )
                if (response.status === 200) {
                    router.replace("/")
                    router.refresh()
                    toast.success("Logged in successfully")
                }
            } else {
                const registerData = data as RegisterPayload
                const payload = {
                    email: registerData.email,
                    password: registerData.password,
                    binanceApiKey: registerData.binance_api_Key,
                    binanceSecretKey: registerData.binance_secret_Key,
                }
                const response = await axios.post(`${axiosconfg.baseURL}/api/auth/${state}`, payload, axiosconfg)

                if (response.status === 201) {
                    router.replace("/")
                    router.refresh()
                    toast.success(response.data.data?.message)

                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 409) {
                    toast.error("user already exists ! try logging in")
                } else if (error.response?.status === 401) {
                    toast.error("Invalid email or password")
                } else if (error.response?.status === 400) {
                    toast.error("Validation failed")
                } else {
                    toast.error(error.message)
                }
            }
        }
    }


    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, i) => (
                <div className="space-y-2" key={i}>
                    <label className="block text-xs sm:text-sm tracking-widest uppercase text-zinc-400">
                        {field}
                    </label>
                    <input
                        {...register(field as keyof z.infer<typeof authSchema>)}
                        type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                        placeholder={
                            field === 'binance_api_Key' || field === 'binance_secret_Key'
                                ? 'your key'
                                : field === 'email'
                                    ? 'abc@gmail.com'
                                    : '••••••••'
                        }
                        className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all duration-200"
                    />
                    {
                        errors[field as keyof typeof errors] && (
                            <p className='text-red-500 text-sm sm:text-sm'>{errors[field as keyof typeof errors]?.message as string}</p>
                        )
                    }
                </div>
            ))}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white text-sm tracking-widest uppercase font-medium rounded-lg py-3 transition-all duration-200 mt-2"
            >
                {isSubmitting ? (state === 'login' ? "logging in..." : "registering in...") : state}
            </button>
        </form>
    )
}

export default FormSection