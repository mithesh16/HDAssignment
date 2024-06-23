import React from 'react'
import logo from '../Assets/logo2.webp'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
const Dashboard = () => {
  const navigate=useNavigate()

  function logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
    toast.success("Logout Successful")
    navigate('/login')
  }
  
  return (
<nav className="flex items-center  justify-between flex-wrap p-4 z-[1000] bg-primary">
    <div className='flex items-center flex-shrink-0 text-white px-5 '>
      <img
      src={logo}
      alt='Logo'
      className=' h-20'/>
    </div>
    <div className='mr-5'>
      <button className='text-white rounded-xl border-2 border-white px-2 py-1 font-bold' onClick={logout}>Logout</button>
    </div>
</nav>
  
  )
}

export default Dashboard
