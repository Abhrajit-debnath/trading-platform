'use client'

import React, { useState } from 'react'
import Pagination from './Pagination.ui'
import SearchBar from './SearchBar'

const ITEMS_PER_PAGES = 20

// interface TradingPair {
//     symbol: string,
//     baseAsset: string
//     quoteAsset: string
//     status: string
//     price: number
//     isSpotTradingAllowed: boolean
// }


// type PositionsPanelProps = {
//     pairs: TradingPair[]
//     isLoading: boolean
// }



// export default function PositionsPanel({ pairs, isLoading }: PositionsPanelProps) {
//     const [activeTab, setActiveTab] = useState<React.SetStateAction<string>>('positions')
//     const [page, setPage] = useState(1);
//     const totalPages = Math.ceil(pairs.length / ITEMS_PER_PAGES)

//     console.log(pairs);


//     return (
//         <div className="w-full h-full rounded-xl p-4 border overflow-hidden border-gray-300  mt-5 lg:mt-0">
//             <div className="flex items-center justify-between">

//                 <div className="my-5">
//                     {
//                         ["positions", "orders", "trades"].map((navItem, i) => {
//                             return <button onClick={() => {
//                                 setActiveTab(navItem)
//                             }} className={` py-2 font-medium text-gray-600 capitalize ${i === 2 ? 'rounded-r-2xl' : i === 0 ? "rounded-l-2xl" : "border-l-0 border-r-0"} ${activeTab == navItem ? "bg-gray-100 transition-all duration-250" : ""} transition-all duration-500 border border-gray-300 px-4 text-xs font-poppins`}>{navItem}</button>

//                         })
//                     }
//                 </div>
//                 <div className="">
//                     <SearchBar />
//                 </div>

//             </div>
//             {activeTab === 'positions' && (
//                 <table className="w-full">
//                     <thead>
//                         <tr>
//                             {['Transaction', 'Size', 'Entry Price', 'Market Price', 'P&L', 'Unrealized %'].map((col) => (
//                                 <th key={col} className="px-3 py-2 text-left text-[10px] text-slate-500">
//                                     {col}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {pairs.map((pair) => (
//                             <tr key={pair.symbol} className="border-t border-slate-100 hover:bg-slate-50">
//                                 <td className="px-3 py-2 text-[11px] font-semibold">{pair.symbol}</td>
//                                 <td className="px-3 py-2 text-[11px] text-slate-500">{pair.baseAsset}</td>
//                                 <td className="px-3 py-2 text-[11px] text-slate-500">{pair.quoteAsset}</td>
//                                 <td className="px-3 py-2 text-[11px]">
//                                     <span className="bg-emerald-100 capitalize text-emerald-600 rounded px-1.5 py-0.5 text-[10px]">
//                                         {pair.price}
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//             <Pagination setPage={setPage} page={page} totalPages={totalPages} />
//         </div>
//     )
// }

export default function PositionsPanel() {
    const [activeTab, setActiveTab] = useState<React.SetStateAction<string>>('positions')
    // const [page, setPage] = useState(1);
    // const totalPages = Math.ceil(pairs.length / ITEMS_PER_PAGES)

    return (
        <div className="w-full h-full rounded-xl p-4 border border-gray-300 mt-5 lg:mt-0 flex flex-col overflow-hidden">

            {/* Tabs + Search — fixed height */}
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

            {/* Table — flex-1 + overflow-y-auto, yahi scroll karega */}
            <div className="flex-1 overflow-y-auto min-h-0">
                {activeTab === 'positions' && (
                    <table className="w-full">
                        <thead className="sticky top-0 bg-white z-10">
                            <tr>
                                {['Transaction', 'Size', 'Entry Price', 'Market Price', 'P&L', 'Unrealized %'].map((col) => (
                                    <th key={col} className="px-3 py-2 text-left text-[10px] text-slate-500">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {pairs.map((pair) => (
                                <tr key={pair.symbol} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-3 py-2 text-[11px] font-semibold">{pair.symbol}</td>
                                    <td className="px-3 py-2 text-[11px] text-slate-500">{pair.baseAsset}</td>
                                    <td className="px-3 py-2 text-[11px] text-slate-500">{pair.quoteAsset}</td>
                                    <td className="px-3 py-2 text-[11px]">
                                        <span className="bg-emerald-100 capitalize text-emerald-600 rounded px-1.5 py-0.5 text-[10px]">
                                            {pair.price}
                                        </span>
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination — fixed at bottom */}
            {/* <div className="shrink-0 pt-2 border-t border-gray-100">
                <Pagination setPage={setPage} page={page} totalPages={totalPages} />
            </div> */}

        </div>
    )
}