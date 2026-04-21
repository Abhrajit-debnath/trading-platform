import { useAppSelector } from '@/app/hook'
import { TRADING_PAIRS } from '@/app/src/constants/tradingPairs'
import React from 'react'

const TradeButton = () => {
  const symbol = useAppSelector((state) => state.symbols.value)
  const side = useAppSelector((state) => state.side.value)

  const buttonBase = TRADING_PAIRS.find((s) => s.symbol === symbol)

  return (
    <div className='mt-5'>
      <div className={`rounded-full border border-0.5 ${side === 'BUY' ? "border-green-600" : "border-red-600"} px-0.5`}>
        <button type='submit' className={`cursor-pointer font-medium rounded-full w-full border-2 ${side === 'BUY' ? "bg-green-700" : "bg-red-700"} p-2 text-white text-center capitalize`}>
          {side} <span className='uppercase'>{`${buttonBase?.base}/${buttonBase?.quote}`}</span>
        </button>
      </div>

    </div>
  ) 
}

export default TradeButton
