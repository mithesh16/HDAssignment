import React, { useState,ChangeEvent, KeyboardEvent } from 'react'
import {signUPdata} from '../Assets/Types';
import { verifyUserOTP,resendOTP } from '../Services/Auth';
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
interface Props{
  email:string
}

const OTPBox = ({email}:Props) => {
  const navigate = useNavigate()
  const [otp,setOtp]=useState <string[]>(['','','',''])
  const user = sessionStorage.getItem('signupdata');
  //const userData: signUPdata = JSON.parse(user);

function changeOTP(val:string,key:number){
  const newOtp = [...otp];
        newOtp[key] = val;
        setOtp(newOtp);
}
const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
  if (e.key === " " || isNaN(Number(e.key)) && (e.key !== "Backspace")) {
      e.preventDefault();  // Prevent space input
  }
};

async function verifyOTP(){
try {
  const resp=await verifyUserOTP(user?user:'',otp.join(''))
if(resp.msg=="OTPVERIFIED"){
  localStorage.setItem('jwt',resp.token)
  localStorage.setItem('user',JSON.stringify(resp.user))
  toast.success("User Registered")
  navigate('/dashboard')
}
else{
  toast.error("OTP Invalid")
}
} catch (error:any) {
  toast.error(error.msg)
}
  
}

async function resendotp(){
  try{
  const resp=await resendOTP(email);
  if(resp.msg=="OTPSENT"){
    toast.success("OTP Sent");
  }
  }
  catch(err:any){
    toast.error(err.msg)
  }
}

  return (
<div className='w-[90%] lg:w-3/4 p-10 border shadow-lg rounded-lg'>
  <div className=''>
    <div className='text-center'> 
      <h1 className='text-primary text-3xl font-bold'>Email Verfication</h1>
      <p className='text-gray-400 text-sm mt-1'>We have sent a code to your email {email}</p>
    </div>
    <form className='flex items-center justify-center gap-x-2 lg:gap-x-8 my-10'>
    {otp.map((digit, index) => (
                <input
                    key={index}
                    type='text'
                    maxLength={1}
                    className='w-16 h-16 border text-lg px-5 rounded-xl outline-none border-gray-200 focus:bg-gray-50 focus:ring-1 ring-primary'
                    value={digit}
                    onChange={(e) => changeOTP(e.target.value, index)}
                    onKeyDown={handleKeyDown}
                />
            ))}
    </form>

    <button className='text-xl p-4 bg-primary w-full rounded-lg text-white' onClick={verifyOTP}>Verify</button>
    <p className='text-center text-sm text-primary mt-3'>Didn't recieve code?<button onClick={resendotp} className='text-secondary'> Resend</button> </p>
  </div>
  </div>
  
  )
}

export default OTPBox
