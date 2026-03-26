import React, { useState } from 'react'
import MarketNav from '../TradingControlPanel/MarketNav.ui'
import TradeButton from '../TradingControlPanel/TradeButton.ui'

const PriceControls = () => {
    
    return (
        <div className='w-full'>
            <div className="">
                <MarketNav />
            </div>
            <div className="mt-2 flex flex-col space-y-2">
                <label htmlFor="" className='font-poppins text-sm text-gray-600 capitalize'>Limit Price</label>
                <div className="relative">
                    <input
                        type="text"
                        className='w-full border rounded-xs border-gray-300 outline-none px-4 py-0.5 pr-12'
                    />
                    <span className='font-roboto text-xs font-medium text-gray-600 uppercase absolute right-2 top-1/2 -translate-y-1/2'>
                        usdt
                    </span>
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between lg:gap-5">
                    <div className="flex-col flex space-y-2">
                        <label htmlFor="" className='font-poppins text-sm text-gray-600 capitalize'>quantity</label>
                        <div className="relative">
                            <input
                                type="text"
                                className='w-full border rounded-xs border-gray-300 outline-none px-4 py-0.5 pr-12'
                            />
                            <span className='font-roboto text-xs font-medium text-gray-600 uppercase absolute right-2 top-1/2 -translate-y-1/2'>
                                btc
                            </span>
                        </div>
                    </div>
                    <div className="flex-col flex space-y-2">
                        <label htmlFor="" className='font-poppins text-sm text-gray-600 capitalize'>total</label>
                        <div className="relative">
                            <input
                                type="text"
                                className='w-full border rounded-xs border-gray-300 outline-none px-4 py-0.5 pr-12'
                            />
                            <span className='font-roboto text-xs font-medium text-gray-600 uppercase absolute right-2 top-1/2 -translate-y-1/2'>
                                usdt
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">

                <div className=""></div>
                <TradeButton />
            </div>

        </div>
    )
}

export default PriceControls
