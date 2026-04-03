'use client'

import React, { useState } from 'react'
import Pagination from './Pagination.ui'
import SearchBar from './SearchBar'
import UseReactQuery from '@/app/src/hooks/UseReactQuery.hook'
import PositionRow from './PositionRow.ui'
import { symbol } from 'zod'
import HistoryTable from './HistoryTable.ui'
export default function PositionsPanel() {

    const [activeTab, setActiveTab] = useState<React.SetStateAction<string>>('positions')
    const data = UseReactQuery(activeTab === 'positions' ? "/api/trading/positions" : activeTab === 'orders' ? "/api/trading/orders" : "/api/trading/trades","positions")
    const tradesData = data?.data ?? []
    return (
        <div className="w-full h-full rounded-xl p-4 border border-gray-300 mt-5 lg:mt-0 flex flex-col overflow-hidden">


            <div className="flex items-center justify-between shrink-0">
                <div className="my-5">
                    {["positions", "orders", "trades"].map((navItem, i) => (
                        <button
                            key={navItem}
                            onClick={() => setActiveTab(navItem)}
                            className={`py-2 font-medium text-gray-600 capitalize ${i === 2 ? 'rounded-r-2xl' : i === 0 ? "rounded-l-2xl" : "border-l-0 border-r-0"} ${activeTab == navItem ? "bg-gray-100 transition-all duration-250" : ""} transition-all duration-500 border border-gray-300 px-4 text-xs font-poppins`}
                        >
                            {navItem}
                        </button>
                    ))}
                </div>
                <div><SearchBar /></div>
            </div>


            <div className="flex-1 overflow-y-auto min-h-0">
                {activeTab === 'positions' ?
                    (<HistoryTable tradesData={tradesData} />) : activeTab === 'orders' ?
                        (<HistoryTable tradesData={tradesData} />) :
                        (<HistoryTable tradesData={tradesData} />)

                }
            </div>

            {/* Pagination — fixed at bottom */}
            {/* <div className="shrink-0 pt-2 border-t border-gray-100">
                <Pagination setPage={setPage} page={page} totalPages={totalPages} />
            </div> */}

        </div>
    )
}