'use client'

import React, { useState } from 'react'
import SearchBar from './SearchBar'
import UseReactQuery from '@/app/src/hooks/UseReactQuery.hook'
import HistoryTable from './HistoryTable.ui'

type tradeType = {
    price: number
    quantity: number
    side: string
    symbol: string
}
export default function PositionsPanel() {

    const [activeTab, setActiveTab] = useState<React.SetStateAction<string>>('positions')
    const [data, isLoading] = UseReactQuery(activeTab === 'positions' ? "/api/trading/positions" : activeTab === 'orders' ? "/api/trading/orders" : "/api/trading/trades", "positions")
    console.log(data);


    const [search, setsearch] = useState("")
    const tradesData = data?.data ?? []
    const filteredPositions = search.length > 0 ? tradesData.filter((trade: tradeType) => trade.symbol.toLowerCase().includes(search.toLowerCase())) : tradesData
    return (
        <div className="w-full h-full rounded-xl p-4 border border-gray-300 mt-5 lg:mt-0 flex flex-col overflow-hidden">


            <div className="flex items-center justify-between shrink-0">
                <div className="my-5">
                    {["positions", "orders", "trades"].map((navItem, i) => (
                        <button
                            key={navItem}
                            onClick={() => setActiveTab(navItem)}
                            className={`py-2 font-medium text-gray-600 capitalize ${i === 2 ? 'rounded-r-2xl' : i === 0 ? "rounded-l-2xl" : "border-l-0 border-r-0"} ${activeTab == navItem ? "bg-purple-500 border-purple-500 text-white transition-all duration-250" : ""} transition-all duration-500 border border-gray-300 px-4 text-xs font-poppins`}
                        >
                            {navItem}
                        </button>
                    ))}
                </div>
                <div><SearchBar setSearch={setsearch} search={search} /></div>
            </div>


            <div className="flex-1 overflow-y-auto min-h-0">

                {isLoading ? (
                    <div className="text-gray-400 text-sm p-4 w-full font-poppins h-full flex justify-center items-center capitalize md:text-lg">loading data ...</div>
                ) : filteredPositions.length === 0 ? (
                    <div className="text-gray-400 text-sm p-4 w-full h-full flex justify-center items-center capitalize md:text-lg font-poppins">no data ..</div>
                ) : (
                    <HistoryTable tradesData={filteredPositions} />
                )}
            </div>
        </div>
    )
}