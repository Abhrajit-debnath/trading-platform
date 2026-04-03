'use client'
import { useEffect, useState } from 'react'

const UsePriceTicker = (symbol: string): [number, number, boolean] => {
  const [price, setPrice] = useState<number>(0)
  const [change, setChange] = useState<number>(0)
  const [isPositive, setIsPositive] = useState<boolean>(true)

  useEffect(() => {
    let ws: WebSocket

  
      ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`)
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data)
        setPrice(parseFloat(data.c))
        setChange(parseFloat(data.P))
        setIsPositive(parseFloat(data.P) >= 0)
      }


    return () => ws.close()
  }, [symbol])

  return [price, change, isPositive]
}

export default UsePriceTicker