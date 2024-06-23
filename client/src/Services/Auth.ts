import { signUPdata,signINdata } from "../Assets/Types"

import dotenv from 'dotenv'; 
dotenv.config();
//const base_url=process.env.REACT_APP_BASE_URL?process.env.REACT_APP_BASE_URL:''
const base_url="https://hdassignment.onrender.com"
// const base_url="http://localhost:3000"
const token=localStorage.getItem('jwt')

export const userSignUp=async(userdata:signUPdata)=>{
    
    try {
        const resp=await fetch(`${base_url}/signup`,{
            method:'POST',    
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':' http://192.168.1.4:3000',
              },
            body:JSON.stringify(userdata)
        })
       return await resp.json();
    } 
    catch (error) {
        return error;
    }
}


export const userLogin=async(userdata:signINdata)=>{
    
    try {
        const resp=await fetch(`${base_url}/login`,{
            method:'POST',    
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':' http://192.168.1.4:3000',
              },
            body:JSON.stringify(userdata)
        })
       return await resp.json();
    } 
    catch (error) {
        return error;
    }
}

export const verifyUserOTP=async(userdata:string,otp:string)=>{
    const signupdata=JSON.parse(userdata)
try {
    const resp=await fetch(`${base_url}/verifyotp`,{
        method:'POST',    
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':' http://192.168.1.4:3000',
          },
        body:JSON.stringify({signupdata,otp})
})
return await resp.json();
}
 catch (error) {
    console.log(error)
    return error;
}
}


export const resendOTP=async(email:string)=>{
    try {
        const resp=await fetch(`${base_url}/resendotp`,{
            method:'POST',    
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':' http://192.168.1.4:3000',
              },
            body:JSON.stringify({email})
    })
    return await resp.json();
    }
     catch (error) {
        console.log(error)
        return error;
    }
}