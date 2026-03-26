import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
    return (
        <div className=''>
            <div className="border rounded-full border-gray-300 w-50 px-7 py-1 relative">
                <input type="text" className='outline-none border-none text-sm w-full font-poppins text-gray-600 capitalize' placeholder='search' />
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                    <IoSearchOutline className='text-gray-700' />
                </div>
            </div>

        </div>
    )
}

export default SearchBar
