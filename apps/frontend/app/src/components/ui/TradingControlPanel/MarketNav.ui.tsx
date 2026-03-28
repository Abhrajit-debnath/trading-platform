import React, { SetStateAction, useState } from 'react'


type MarketNavProps = {
    activeMarketnav: string,
    setActiveMarketnav: React.Dispatch<SetStateAction<string>>
}

const MarketNav = ({ activeMarketnav, setActiveMarketnav }: MarketNavProps) => {


    return (
        <div className='mt-5'>
            <ul className='flex gap-5 border-b-2 border-gray-300 pb-2 mb-5'>
                {["limit", "market", "stop market"].map((navItem) => (
                    <li
                        key={navItem}
                        onClick={() => setActiveMarketnav(navItem)}
                        className="cursor-pointer relative pb-2"
                    >
                        <span className={`text-xs font-medium capitalize font-poppins lg:text-sm transition-colors duration-200
                            ${activeMarketnav === navItem ? "text-purple-600" : "text-gray-500"}`}>
                            {navItem}
                        </span>
                        <div className={`absolute -bottom-2.5 left-0 h-0.5 w-full rounded-3xl bg-purple-500 
    transition-transform duration-400 ease-in-out origin-center
    ${activeMarketnav === navItem ? "scale-x-100" : "scale-x-0"}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MarketNav