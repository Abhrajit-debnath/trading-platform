import React from 'react'
import TradingChart from './TradingChart.ui'
import { useAppSelector } from '@/app/hook'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const PriceChart = () => {
    const symbol = useAppSelector((state) => state.symbols.value)

    const { data: chartData } = useQuery({
        queryKey: ['chartInfo', symbol],
        queryFn: async () => {
            const res = await axios.get(
                `https://testnet.binance.vision/api/v3/klines?symbol=${symbol}&interval=1m&limit=500`
            )
            return res.data
        },
    })
    console.log(chartData);
    

    return (
        <div className='rounded-3xl p-4 border border-gray-300'>
            <div className="flex justify-between">
                <div className="pb-3">
                    <div className="uppercase font-poppins font-medium pb-3 text-md">{`${symbol.substring(0, 3)}/${symbol.substring(3,)}`}</div>
                    <div className="font-poppins font-semibold text-xl">$107,843.82</div>
                </div>
                <div className="">
                    <button className='rounded-l-2xl border border-gray-300 px-3 py-1 text-xs'>1m</button>
                    <button className=' border border-l-0 border-gray-300 px-3 py-1 text-xs'>5m</button>
                    <button className=' border border-l-0 border-gray-300 px-3 py-1 text-xs'>1d</button>
                    <button className='rounded-r-2xl border border-l-0 border-gray-300 px-3 py-1 text-xs'>1w</button>
                </div>
            </div>
            <div className="w-full">
                <TradingChart chartData={chartData} symbol={symbol} />
            </div>

        </div>
    )
}

export default PriceChart
