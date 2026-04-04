import { useState } from 'react'
import MarketNav from '../TradingControlPanel/MarketNav.ui'
import TradeButton from '../TradingControlPanel/TradeButton.ui'
import { useForm, type Resolver } from "react-hook-form"
import { combinedOrderSchema, type orderFormData } from "../../../schema/OrderFormSchema/order.schema"
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppSelector } from '@/app/hook'
import axios from 'axios'
import toast from 'react-hot-toast'

const PriceControls = () => {
    const [activeMarketnav, setActiveMarketnav] = useState<string>("limit")
    const symbol = useAppSelector((state) => state.symbols.value)
    const side = useAppSelector((state) => state.side.value)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<orderFormData>({
        resolver: zodResolver(combinedOrderSchema) as Resolver<orderFormData>,
        shouldUnregister: true
    });


    const limitPrice = watch("limitPrice")
    const quantity = watch("quantity")




    const onformSubmit = async (data: orderFormData) => {
        console.log(data);

        const payload = {
            symbol,
            side,
            price: data.limitPrice || undefined,
            stopPrice: data.stopPrice || undefined,
            type: data.limitPrice ? "LIMIT" : data.stopPrice ? "STOP_LOSS" : "MARKET",
            quantity: data.quantity
        }
        try {
            const res = await axios.post("http://localhost:8000/api/trading/orders", payload, {
                withCredentials: true
            })
            toast.success(`order placing  ${data.limitPrice ? `at ${data.limitPrice}` : `with ${data.quantity}`}`)




        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.status === 404 ? "Order failed" : error.message)

            } else {
                toast.error("Something went wrong")
            }
        }
    };



    return (
        <div className='w-full h-full'>
            <div className="">
                <MarketNav activeMarketnav={activeMarketnav} setActiveMarketnav={setActiveMarketnav} />
            </div>
            <form onSubmit={handleSubmit(onformSubmit)} className="mt-2 flex flex-col space-y-2">
                {activeMarketnav !== 'market' && (
                    <>
                        <label htmlFor="inputLimit" className='font-poppins text-sm text-gray-600 capitalize font-medium'>
                            {activeMarketnav === 'limit' ? "limit price" : activeMarketnav === 'stop market' ? "stop price" : ""}
                        </label>
                        <div className="relative">

                            <input
                                {...register(`${activeMarketnav === 'limit' ? "limitPrice" : "stopPrice"}`, { valueAsNumber: true })}

                                id='inputLimit'
                                type="number"

                                className='w-full border rounded-xs border-gray-300 outline-none px-4 py-0.5 pr-12'
                            />
                            <span className='font-roboto text-xs font-medium text-gray-600 uppercase absolute right-2 top-1/2 -translate-y-1/2'>
                                usdt
                            </span>

                        </div>
                        {
                            errors && <div className="text-red-500 font-roboto text-sm">{errors.limitPrice?.message || errors.stopPrice?.message}</div>
                        }
                    </>
                )}

                <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between lg:gap-5">
                    <div className="flex-col flex space-y-2">
                        <label htmlFor="inputquant" className='font-poppins text-sm text-gray-600 capitalize font-medium'>quantity</label>
                        <div className="relative">
                            <input
                                {...register("quantity", { valueAsNumber: true })}
                                id='inputquant'
                                type="number"
                                step="0.0001"
                                min="0.0001"
                                className='w-full border rounded-xs border-gray-300 outline-none px-4 py-0.5 pr-12'
                            />
                            <span className='font-roboto text-xs font-medium text-gray-600 uppercase absolute right-2 top-1/2 -translate-y-1/2'>
                                {symbol.substring(0, 3)}
                            </span>

                        </div>
                        {
                            errors && <div className="text-red-500 font-roboto text-sm">{errors.quantity?.message}</div>
                        }
                    </div>
                    {activeMarketnav === 'limit' && (
                        <div className="flex-col flex space-y-2">
                            <label htmlFor='inputTotal' className='font-poppins text-sm text-gray-600 capitalize font-medium'>total</label>
                            <div className="relative">
                                <input value={limitPrice && quantity ? (quantity * limitPrice) : ""} readOnly id='inputTotal' type="text" className='w-full border rounded-xs border-gray-300 outline-none px-4 py-0.5 pr-12' />
                                <span className='font-roboto text-xs font-medium text-gray-600 uppercase absolute right-2 top-1/2 -translate-y-1/2'>
                                    usdt
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="">


                    <TradeButton />
                </div>
            </form>


        </div>
    )
}

export default PriceControls
