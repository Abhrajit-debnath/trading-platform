import React, { useState } from 'react'

const MarketNav = () => {
    const [active, setActive] = useState("limit")

    return (
        <div className='mt-5'>
            <ul className='flex gap-5 border-b-2 border-gray-300 pb-2 mb-5'>
                {["limit", "market", "stop market"].map((navItem) => (
                    <li
                        key={navItem}
                        onClick={() => setActive(navItem)}
                        className="cursor-pointer relative pb-2"
                    >
                        <span className={`text-xs font-medium capitalize font-poppins transition-colors duration-200
                            ${active === navItem ? "text-purple-600" : "text-gray-500"}`}>
                            {navItem}
                        </span>
                        <div className={`absolute -bottom-2.5 left-0 h-0.5 w-full rounded-3xl bg-purple-500 
    transition-transform duration-400 ease-in-out origin-center
    ${active === navItem ? "scale-x-100" : "scale-x-0"}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MarketNav