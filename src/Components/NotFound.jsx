import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col gap-[15vh]'>
      <h1 className='text-6xl font-bold'>404</h1>
      <h3 className='text-3xl font-normal'>Page Not Found !!</h3>
      <div className='border rounded-md px-4 py-2 font-bold hover:bg-gray-100 hover:border-2'>
        <NavLink to='/'>Home</NavLink>
      </div>
    </div>
  )
}

export default NotFound