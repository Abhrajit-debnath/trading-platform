
import { memo, useContext, useMemo, useState } from 'react'
import { tradesDataInterface } from './HistoryTable.ui'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { priceContext } from '../../providers/AllPrice.Provider';
import axios from 'axios';
import { axiosconfg } from '@/app/src/config/axios.config';
import toast from 'react-hot-toast';


type positionRowProps = {
    position: tradesDataInterface
}

const handleExitPosition = async (tradePosition: tradesDataInterface) => {

    const exitPayLoad = {
        symbol: tradePosition.symbol,
        side: tradePosition.side === 'BUY' ? "SELL" : "BUY",
        type: 'MARKET',
        quantity: tradePosition.quantity,
    }
    try {
        const tradeResponse = await axios.post("/api/trading/orders", exitPayLoad, axiosconfg)
        toast.success(`Exit order placed for ${tradePosition.quantity}`)

    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.status === 404 ? "Order failed" : error.message)

        } else {
            toast.error("Something went wrong")
        }
    }


}

const PositionRow = memo(({ position }: positionRowProps) => {
    const [showExit, setshowExit] = useState(false)
    const prices = useContext(priceContext)
    const { percent, pnl, nanCheckPercent, nanCheckPnl } = useMemo(() => {
        const nanCheckPnl = isNaN(((prices[position.symbol] - position.price) * position.quantity))
        const nanCheckPercent = isNaN(position.price ? (((prices[position.symbol] - position.price) / position.price) * 100) : 0)
        const pnl = ((prices[position.symbol] - position.price) * position.quantity).toFixed(4)
        const percent = (((prices[position.symbol] - position.price) / position.price) * 100).toFixed(6)
        return { percent, pnl, nanCheckPnl, nanCheckPercent }
    }, [prices, position.price, position.quantity])
    return (
        <tr className="border-t border-slate-100 hover:bg-slate-50" onMouseLeave={() => setshowExit(false)} onMouseEnter={() => setshowExit(true)
        }>
            <td className="px-3 py-2 text-[11px] md:text-[12px] font-semibold font-poppins"><div className="flex gap-2 items-center"><span className={`rounded-full p-1 ${prices[position.symbol] > position.price ? "bg-emerald-100 text-emerald-400" : "bg-red-200 text-red-500"}`}>{position.price < prices[position.symbol] ? <FaArrowUp /> : <FaArrowDown />}</span>{position.symbol}</div></td>
            <td className="px-3 py-2 text-[11px] md:text-[12px] text-slate-500">{position.quantity}</td>
            <td className="px-3 py-2 text-[11px] md:text-[12px] text-slate-500">{position.price}</td>
            <td className="px-3 py-2 text-[11px]">
                <span className=" capitalize md:text-[12px] rounded px-1.5 py-0.5 text-[10px]">
                    {prices[position.symbol]}
                </span>
            </td>
            <td className='relative'>
                <span className={`px-3 py-2 text-[11px] md:text-[12px] rounded-full ${prices[position.symbol] > position.price ? "bg-emerald-100 text-emerald-400" : "bg-red-200 text-red-500"}`}>{`${position.price > prices[position.symbol] ? pnl : `- ${nanCheckPnl ? "0.00" : pnl}`}`}</span>
                <div className={`absolute top-1 left-25 md:text-[14px] text-white text-sm px-2 rounded-lg py-1 ${position.side === 'BUY' ? "bg-red-500" : "bg-green-500"} opacity-0 scale-0 ${showExit ? "opacity-100 scale-100" : "opacity-0"} cursor-pointer  duration-400 transition-transform `} onClick={() => handleExitPosition(position)}>{position.side === 'BUY' ? "Sell" : "buy"}</div></td>
            <td className="px-3 py-2 text-[11px] md:text-[12px] text-slate-500">{nanCheckPercent ? "0.00" : percent}</td>
        </tr>
    )
})

export default PositionRow
