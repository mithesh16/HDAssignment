import React from 'react'
import LoginBox from '../Components/LoginBox'
import loginimage from '../Assets/login.png'
const Login = () => {
    
  return (
    <div className='grid grid-cols-2 h-screen w-full' >
      <div className='order-1 flex items-center justify-end'>
        <img src={loginimage} alt="Login" />
      </div>
      <div className='order-2 flex items-center w-full justify-start' > <LoginBox /></div>
     
    </div>
  )
}

export default Login
