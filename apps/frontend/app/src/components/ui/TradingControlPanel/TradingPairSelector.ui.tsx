'use client'

import { useAppDispatch, useAppSelector } from '@/app/hook'
import { TRADING_PAIRS } from '@/app/src/constants/tradingPairs'
import { setSymbol } from '@/app/src/store/slices/symbolSlice'
import { useState, useRef, useEffect } from 'react'



const TradingPairSelector = () => {

    const symbol = useAppSelector(state => state.symbols.value)
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)
    const selected = TRADING_PAIRS.find(p => p.symbol === symbol) ?? TRADING_PAIRS[0]


    const filtered = TRADING_PAIRS.filter(
        p =>
            p.symbol.toLowerCase().includes(search.toLowerCase()) ||
            p.name.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
                setSearch('')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => searchRef.current?.focus(), 50)
        }
    }, [isOpen])



    return (
        <div ref={dropdownRef} className="relative w-40 sm:w-40 ">

            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full cursor-pointer flex items-center justify-between gap-2 px-3 py-1 border-gray-300 border rounded-full transition-colors duration-150 group"
            >
                <div className="flex items-center gap-3">

                    <div className="w-6 h-6  rounded-full bg-[#f7931a]/20 flex  items-center justify-center">
                        <span className="text-[10px] font-bold text-[#f7931a]">
                            {selected.base.slice(0, 1)}
                        </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-poppins font-medium text-gray-500 tracking-wide ">
                            {selected.base}
                        </span>
                        <span className="text-sm font-poppins font-medium text-gray-500">/{selected.quote}</span>
                    </div>
                </div>


                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>


            {isOpen && (
                <div className="absolute w-72  top-full mt-1 right-0 z-50 rounded-md border border-gray-300 bg-white shadow-2xl overflow-hidden">

                    <div className="px-2 pt-2 pb-1">
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded  border border-gray-300">
                            <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                            </svg>
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search pairs..."
                                className="flex-1 bg-transparent text-sm text-gray-600  placeholder-gray-600 outline-none"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="text-gray-600 hover:text-gray-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    <ul className="max-h-52 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-[#2a2d3a]">
                        {filtered.length === 0 ? (
                            <li className="px-3 py-3 text-sm text-gray-500 text-center">No pairs found</li>
                        ) : (
                            filtered.map(pair => {
                                const isSelected = pair.symbol === symbol
                                return (
                                    <li key={pair.symbol}>
                                        <button
                                            onClick={() => {
                                                dispatch(setSymbol(pair.symbol))
                                                setIsOpen(!isOpen)
                                                setSearch("")
                                            }}
                                            className={`w-full flex items-center font-poppins font-medium justify-between px-3 py-2 text-left transition-colors duration-200
                        ${isSelected
                                                    ? ' text-gray-600'
                                                    : 'text-gray-500 hover:bg-gray-300 '
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 rounded-full bg-white/5 flex items-center justify-center ">
                                                    <span className="text-xs font-bold text-gray-400">
                                                        {pair.base.slice(0, 1)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-medium text-gray-600">{pair.base}</span>
                                                    <span className="text-xs font-medium text-gray-600">/{pair.quote}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] md:text-xs text-gray-600">{pair.name}</span>
                                                {isSelected && (
                                                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </button>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default TradingPairSelector