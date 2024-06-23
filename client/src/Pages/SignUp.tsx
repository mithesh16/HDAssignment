import React from 'react'
import SignUpBox from '../Components/SignUpBox'
import signupimage from '../Assets/signUp.png'
import { useState } from 'react'
import OTPBox from '../Components/OTPBox'
import {signUPdata} from '../Assets/Types'
import { userSignUp } from '../Services/Auth'

const SignUp = () => {

const [otpgen,setotpgen]=useState<boolean>(false)
// const [signupdata,setsignupdata]=useState<signUPdata>({
//   firstname:'',
//   lastname:'',
//   password:'',
//   email:''
// });
const [email,setEmail]=useState<string>('');


  return (

     <div className='flex lg:grid grid-cols-2 h-screen w-full' >
      <div className='hidden lg:order-1 lg:flex items-center justify-end'>
        <img src={signupimage} alt="SignUP" className=' w-full'/>
      </div>
{
  otpgen?
  <div className='order-2 flex items-center w-full justify-center lg:justify-start' > 
  <OTPBox email={email}/>
  </div>
  :
  <div className='order-2 flex items-center w-full justify-center lg:justify-start' > 
  <SignUpBox setotpgen={setotpgen} setUserEmail={setEmail} /></div>
}

    </div>

  )
}

export default SignUp
