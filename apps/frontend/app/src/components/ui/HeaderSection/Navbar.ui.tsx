
import React from 'react'
import LogoutButton from './LogoutButton'

const Navbar = () => {
    return (
        <div className='rounded-lg bg-gray-200 backdrop-blur-xl flex justify-between p-2'>
            <h1 className='font-poppins text-xl capitalize text-purple-600 font-medium p-2'>cryptex</h1>
            <LogoutButton/>
        </div>
    )
}

export default Navbar
