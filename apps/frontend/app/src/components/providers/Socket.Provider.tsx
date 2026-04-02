'use client'

import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const SocketProvider = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {

        const socket = io("http://localhost:8002", {
            withCredentials : true
        })

        socket.on("connect", () => console.log(socket.id))
        socket.on("ORDER_UPDATE", (data) => console.log(data))

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