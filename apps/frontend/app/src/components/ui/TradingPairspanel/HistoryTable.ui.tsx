import React from 'react'
import PositionRow from './PositionRow.ui'

export interface tradesDataInterface {

    createdAt: Date
    id: string
    orderId: string
    price: number
    quantity: number
    status: string
    symbol: string
    timeStamp: Date
    userId: string

}

type HistoryTableProps = {
    tradesData: tradesDataInterface[]
}

const HistoryTable = ({ tradesData }: HistoryTableProps) => {
    return (
        <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
                <tr>
                    {['Transaction', 'Size', 'Entry Price', 'Market Price', 'P&L', 'Unrealized %'].map((col) => (
                        <th key={col} className="px-3 py-2 text-left text-[10px] text-slate-500 w-1/6">
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tradesData.map((position) => (
                    <PositionRow key={position.id} position={position} />
                ))}
            </tbody>
        </table>
    )
}

export default HistoryTable
