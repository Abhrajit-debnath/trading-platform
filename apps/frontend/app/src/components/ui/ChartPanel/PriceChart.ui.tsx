'use client'
import React, { useState } from 'react'
import TradingChart from './TradingChart.ui'
import { useAppSelector } from '@/app/hook'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UsePriceTicker from '@/app/src/hooks/UsePriceTicker.hook'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { TRADING_PAIRS } from '@/app/src/constants/tradingPairs'


const PriceChart = () => {
    const symbol = useAppSelector((state) => state.symbols.value)
    const [price, change, isPositive] = UsePriceTicker(symbol)
    const selected = TRADING_PAIRS.find(p => p.symbol === symbol)

    const [interval, setInterval] = useState("1m")

    const { data: chartData } = useQuery({
        queryKey: ['chartInfo', symbol, interval],
        queryFn: async () => {
            const res = await axios.get(
                `https://testnet.binance.vision/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`
            )


            return res.data
        },
        staleTime: 5 * 60 * 1000
    })


    return (
        <div className='rounded-3xl p-4 border border-gray-300'>
            <div className="flex justify-between">
                <div className="pb-3">
                    <div className="uppercase font-poppins font-medium pb-3 text-sm sm:text-lg lg:text-xl">{`${selected?.base}/${selected?.quote}`}</div>
                    <div className="flex gap-2 md:gap-6 lg:gap-8 items-center">
                        <div className="font-poppins font-semibold text-sm sm:text-xl lg:text-[20px] w-18">{price}</div>
                        <div className={`font-poppins font-medium px-3 py-1 rounded-full text-xs flex items-center gap-1
        ${isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                            {isPositive ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                            {change?.toFixed(2)} %
                        </div>
                    </div>
                </div>
                <div className="">
                    {["1m", "5m", "1d", "1w"].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setInterval(tf)}
                            className={`
      ${tf === interval ? 'bg-gray-100' : ''}
      ${tf === "1m" ? "rounded-l-full" : tf === "1w" ? "rounded-r-full border-l-0" : "border-l-0"}
      border border-gray-300 px-3 py-1 text-[10px] lg:text-sm font-roboto
    `}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <TradingChart chartData={chartData} symbol={symbol} interval={interval} />
            </div>

        </div>
    )
}

export default PriceChart
