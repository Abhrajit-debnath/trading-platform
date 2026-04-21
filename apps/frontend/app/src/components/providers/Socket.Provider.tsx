'use client'

import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import { setLastOrderEvent } from '../../store/slices/orderEventSlice'
import { useAppDispatch } from '@/app/hook'
import toast from 'react-hot-toast'

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {

        const socket = io("http://localhost:8001", {
            withCredentials: true,
        })

        socket.on("connect", () => console.log(socket.id))
        socket.on("ORDER_UPDATE", (data) => {

            console.log(data);


            const { status, symbol, orderId, quantity, reason } = data
            const payload = {
                status,
                symbol,
                orderId,
                quantity
            }


            if (status === 'FILLED') {
                dispatch(setLastOrderEvent(payload))
                toast.success(`order filled at ${data.price}`)
            } else if (status === 'REJECTED') {
                if (reason === 'Filter failure: LOT_SIZE') {
                    toast.error(`Order value too small - try increasing ${symbol} quantity`)
                } else if (reason?.includes('LOT_SIZE')) {
                    toast.error(`Invalid lot size`)
                } else {
                    toast.error(`Order rejected: ${reason ?? 'Unknown error'}`)
                }
            }
        })

        socket.on("connect_error", (err) => {
            console.log(err.message);
        });

        return () => {
            socket.close()
        }
    }, [])

    return <>{children}</>
}

export default SocketProvider