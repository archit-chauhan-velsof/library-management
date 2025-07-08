import React from 'react'

const Header = ({resetToken}) => {
    let handleLogout = () => {
        resetToken();
    }
    return (
        <div className='grid grid-cols-18'>
            <div className='col-span-8'></div>
        <span className=' font-extrabold text-3xl col-span-4'>Library Management</span>
        <div className="col-span-5"></div>
        <div className="col-span-1">
            <button className='p-3 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600' onClick={()=>{handleLogout()}}>Logout</button>
        </div>
        </div>
    )
}

export default Header