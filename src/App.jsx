import {useState} from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Login from './components/Login'
import useToken from './custom-hooks/UseToken'



const App = () => {
  const {token,setToken,resetToken} = useToken();
    if(!token){
        return <Login setToken = {setToken}/>
    }
  return (

    <div className='border h-screen w-full grid grid-cols-24 grid-rows-24 '>
      <header className='col-span-24 row-span-2 border flex justify-center items-center'>
        <Header resetToken={resetToken}/>
      </header>
      <div className='col-span-3 row-span-21 border-r hidden sm:flex flex-col gap-4 py-4 px-1'>
        {/* navbar */}
        <NavLink className='bg-gray-100 hover:bg-gray-300 text-center rounded-md p-3' to='/booklist'><div>Booklist</div></NavLink>
        <NavLink to='/studentlist'><div className='bg-gray-100 hover:bg-gray-300 text-center rounded-md p-3'>Studentlist</div></NavLink>
        <NavLink to='/addbook'><div className='bg-gray-100 hover:bg-gray-300 text-center rounded-md p-3'>Add Book</div></NavLink>
        <NavLink to='/usersList'><div className='bg-gray-100 hover:bg-gray-300 text-center rounded-md p-3'>Users List</div></NavLink>
      </div>
      <div className='sm:col-span-21 row-span-21 col-span-24 p-4 bg-gray-100'>
        <Outlet />
      </div>
      <footer className="col-span-24 row-span-1 border-t">
        <Footer/>
      </footer>
    </div>

  )
}

export default App