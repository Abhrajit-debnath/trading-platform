'use client'
import { useEffect, useState } from 'react'
import { TRADING_PAIRS } from '../constants/tradingPairs'


const UsePriceTicker = (symbol: string): [number, number, boolean] => {
  const [price, setPrice] = useState<number>(0)
  const [change, setChange] = useState<number>(0)
  const [isPositive, setIsPositive] = useState<boolean>(true)
  const streams = TRADING_PAIRS.map(p => `${p.symbol.toLowerCase()}@ticker`).join("/")


  const url = `wss://stream.binance.com:9443/stream?streams=${streams}`

  useEffect(() => {
    let ws: WebSocket
    ws = new WebSocket(url)
    ws.onmessage = ((e) => {
      const { data } = JSON.parse(e.data)
      if (data.s === symbol) {
        setPrice(parseFloat(data.c))
        setChange(parseFloat(data.P))
        setIsPositive(parseFloat(data.P) >= 0)
      }


    })


    return () => ws.close()
  }, [symbol])

  return [price, change, isPositive]
}

export default UsePriceTicker