import React from 'react'
import PositionRow from './PositionRow.ui'
import AllPriceProvider from '../../providers/AllPrice.Provider'

export interface tradesDataInterface {

    createdAt: Date
    id: string
    side: string
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
                        <th key={col} className="px-3 py-2 text-left text-[10px] md:text-[13px] text-slate-500 w-1/6">
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tradesData.map((position) => (
                    <AllPriceProvider>
                        <PositionRow key={position.id} position={position} />
                    </AllPriceProvider>

                ))}
            </tbody>
        </table>
    )
}

export default HistoryTable
