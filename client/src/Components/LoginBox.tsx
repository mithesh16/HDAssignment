import React,{useState} from 'react'
import { useNavigate } from "react-router-dom"
import { MdOutlineVisibilityOff,MdOutlineVisibility } from "react-icons/md";
import { signINdata } from '../Assets/Types';
import { userLogin } from '../Services/Auth';
const LoginBox = () => {

    const [visible,setVisible]=useState<boolean>(false)

    function toggleVisible(){
        setVisible(!visible);
    }
    const navigate = useNavigate()

    const [email,setEmail]=useState<string>('')
    const [pass,setPass]=useState<string>('')

    async function submit(){
        const signindata : signINdata={
          email:email,
          password:pass
        }
        const response=await userLogin(signindata);
        if(response.msg=="LogginSuccessful"){
          console.log(response.user)
          navigate('/dashboard')
        }
        else{
          console.log(response.msg)
        }
        
    }
    
  return (
    <div className='border shadow-lg w-[90%] lg:w-2/3 rounded-xl p-5 pb-5'>
        <div className='flex items-center justify-between px-8'>
        <h1 className='text-2xl lg:text-3xl text-primary font-black'>Fill what we know <span className='text-secondary'>!</span></h1>
        </div>
        
      <form className='mt-5 flex flex-col gap-6 px-8'> 

      <input type='mail' placeholder='Email' className='border-b p-2' onChange={(e)=>setEmail(e.target.value)}/>
      <div className='flex items-center justify-between border-b'>
      <input type={visible?'text':'password'} placeholder='Password' className=' p-2 w-full' onChange={(e)=>setPass(e.target.value)}/>
        <button
        className="flex items-center px-4 text-secondary"
        onClick={(e)=>{e.preventDefault();toggleVisible()}}
      >{visible?
        <MdOutlineVisibility size={20} /> : <MdOutlineVisibilityOff size={20}/>}</button>

      </div>

      
        <div className='mt-3'>
        <button type='submit' className='w-full bg-primary text-white text-lg rounded-xl font-bold py-3'
           onClick={(e)=>{
           e.preventDefault()
           submit()}
           }> Sign In</button>
        <button className='w-full bg-white text-primary border-2 border-primary text-lg rounded-xl font-bold py-3 mt-3' 
            onClick={()=>navigate('/')}
        >Sign Up</button>
        </div>
        
      </form>
    </div>
  )
}

export default LoginBox
