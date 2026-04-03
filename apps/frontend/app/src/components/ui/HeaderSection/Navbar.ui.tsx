import React from 'react'

const Navbar = () => {
    return (
        <div className='rounded-lg bg-gray-200 backdrop-blur-xl flex justify-between p-2'>
            <h1 className='font-poppins text-xl capitalize text-purple-600 font-medium p-2'>cryptex</h1>
            <button className='bg-red-500 rounded-xl capitalize cursor-pointer text-white px-5 py-1 font-medium' >logout</button>
        </div>
    )
}

export default Navbar
