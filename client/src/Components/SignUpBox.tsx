import React,{useState} from 'react'
import { MdOutlineVisibilityOff,MdOutlineVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import {signUPdata} from '../Assets/Types';
import { userSignUp } from '../Services/Auth'
import toast, { Toaster } from 'react-hot-toast';
interface Props{
  setotpgen:React.Dispatch<React.SetStateAction<boolean>>
  setUserEmail:React.Dispatch<React.SetStateAction<string>>
}

const SignUpBox = ({setotpgen,setUserEmail}:Props) => {

  const [passwordvisible,setpassVisible]=useState<boolean>(false)
  const [confirmvisible,setconfirmVisible]=useState<boolean>(false)

  function togglePassVisible(){
      setpassVisible(!passwordvisible);
  }
  function toggleConfirmVisible(){
    setconfirmVisible(!confirmvisible);
}
//const user = sessionStorage.getItem('signupdata');
const[fname,setFName]=useState<string>('')
const[lname,setLName]=useState<string>('')
const[pass,setPass]=useState<string>('')
const[cpass,setCPass]=useState<string>('')
const[contact,setContact]=useState<string>('')
const[email,setEmail]=useState<string>('')

const emailRegex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/

async function submit(){

  if(fname===''||lname===''||pass===''||cpass===''||contact===''||email===''){
    toast.error("Fill all the fields")
  }
  else if(!email.match(emailRegex)){
    toast.error("Enter a Valid Email")
  }
  else if(pass!==cpass){
    toast.error("Passwords not matching")
  }
  else if(!pass.match(passwordRegex)){
    toast.error(`Password should be \n tleast 8 characters.\n Atleast 1 number. \n Atleast 1 uppercase.`)
  }
  else{
  const signupdata:signUPdata={
    firstname:fname,
    lastname:lname,
    password:pass,
    email:email
  }
    const resp=await userSignUp(signupdata);
      if(resp.msg=="ExistingUser"){
        console.log("NO")
        toast.error("Email already registered,Please Sign in")
      }
      else if(resp.msg=="OTPSENT"){
          sessionStorage.setItem('signupdata',JSON.stringify(signupdata))
          toast.success("OTP sent")
          setUserEmail(email)
          setotpgen(true)
      }
    else{
      toast.error(resp)
    }
  }
}


  return (
    <div className='border shadow-lg w-[90%] lg:w-2/3 rounded-xl p-5 pb-5'>
        <div className='flex items-center justify-between px-2 lg:px-5 '>
        <h1 className='text-3xl text-primary font-extrabold'>Let us know <span className='text-secondary'>!</span></h1>
        <a href='/login' className='text-primary text-md font-semibold underline'>Sign <span className='text-secondary underline'>In</span></a>
        </div>
        
      <form className='mt-5 lg:mt-10 flex flex-col gap-6 lg:px-8'> 
        <input type='text' placeholder='First Name' className='border-b p-2 ' onChange={(e)=>setFName(e.target.value)}/>
        <input type='text' placeholder='Last Name'  className='border-b p-2'onChange={(e)=>setLName(e.target.value)}/>
        <div className='flex items-center justify-between border-b'>
      <input type={passwordvisible?'text':'password'} placeholder='Enter Password' className=' p-2 w-full' onChange={(e)=>setPass(e.target.value)}/>
        <button
        className="flex items-center px-4 text-secondary"
        onClick={(e)=>{e.preventDefault();togglePassVisible()}}
      >{passwordvisible?
        <MdOutlineVisibility size={20} /> : <MdOutlineVisibilityOff size={20}/>}</button>

      </div>
        <div className='flex items-center justify-between border-b'>
      <input type={confirmvisible?'text':'password'} placeholder='Retype Password' className=' p-2 w-full' onChange={(e)=>setCPass(e.target.value)} />
        <button
        className="flex items-center px-4 text-secondary"
        onClick={(e)=>{e.preventDefault();toggleConfirmVisible()}}
      >{confirmvisible?
        <MdOutlineVisibility size={20} /> : <MdOutlineVisibilityOff size={20}/>}</button>

      </div>

      <input type='list' list='contact-mode' placeholder='Contact mode' className='border-b p-2' onChange={(e)=>setContact(e.target.value)}/>
      <datalist id='contact-mode'>
        <option className="bg-white" >Email</option>
      </datalist>
        <input type='mail' placeholder='Enter Email' className='border-b p-2' onChange={(e)=>setEmail(e.target.value)}/>
        <button type='submit' className='w-full bg-primary text-white text-lg rounded-3xl font-bold py-3' onClick={(e)=>{
          e.preventDefault()
          submit()}}> Sign Up</button>
      </form>
      
    </div>
  )
}

export default SignUpBox
