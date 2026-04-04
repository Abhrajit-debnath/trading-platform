'use client'
import React, { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import { TRADING_PAIRS } from '../../constants/tradingPairs'


export const priceContext = createContext<Record<string, number>>({})
export const usePrices = () => useContext(priceContext)
const AllPriceProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [prices, setPrices] = useState<Record<string, number>>({})

    const streams = TRADING_PAIRS.map(p => `${p.symbol.toLowerCase()}@ticker`).join("/")


    const url = `wss://stream.binance.com:9443/stream?streams=${streams}`

    useEffect(() => {
        let ws: WebSocket
        ws = new WebSocket(url)

        ws.onmessage = (e) => {
            const { data } = JSON.parse(e.data)
            setPrices(prev => ({ ...prev, [data.s]: parseFloat(data.c) }))
        }


        return () => ws.close()
    }, [])


    return (
        <priceContext.Provider value={prices}>
            {children}
        </priceContext.Provider>
    )
}

export default AllPriceProvider
