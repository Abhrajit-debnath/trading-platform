import UsePriceTicker from '@/app/src/hooks/UsePriceTicker.hook'
import { memo, useMemo } from 'react'
import { tradesDataInterface } from './HistoryTable.ui'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";


type positionRowProps = {
    position: tradesDataInterface
}

const PositionRow = memo(({ position }: positionRowProps) => {
    const [price] = UsePriceTicker(position.symbol)
    const { percent, pnl } = useMemo(() => {
        const percent = position.price ? (((price - position.price) / position.price) * 100).toFixed(6) : 0
        const pnl = ((price - position.price) * position.quantity).toFixed(2)
        return { percent, pnl }
    }, [price, position.price, position.quantity])
    return (
        <tr className="border-t border-slate-100 hover:bg-slate-50">
            <td className="px-3 py-2 text-[11px] font-medium"><div className="flex gap-2 items-center"><span className={`rounded-full p-1 ${price > position.price ? "bg-emerald-100 text-emerald-400" : "bg-red-200 text-red-500"}`}>{position.price < price ? <FaArrowUp /> : <FaArrowDown />}</span>{position.symbol}</div></td>
            <td className="px-3 py-2 text-[11px] text-slate-500">{position.quantity}</td>
            <td className="px-3 py-2 text-[11px] text-slate-500">{position.price}</td>
            <td className="px-3 py-2 text-[11px]">
                <span className=" capitalize  rounded px-1.5 py-0.5 text-[10px]">
                    {price}
                </span>
            </td>
            <td ><span className={`px-3 py-2 text-[11px] rounded-full ${price > position.price ? "bg-emerald-100 text-emerald-400" : "bg-red-200 text-red-500"}`}>{`${position.price > price ? pnl : `- ${pnl}`}`}</span></td>
            <td className="px-3 py-2 text-[11px] text-slate-500">{percent}</td>
        </tr>
    )
})

export default PositionRow
