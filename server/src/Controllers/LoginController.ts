import express from 'express'
//import {mongoose} from 'mongoose'
import User from '../Models/UserModel'
import OTP from '../Models/OTPModel';
import { logindata,signupdata,otpdata } from '../Types/Types'
import bcrypt from "bcryptjs";
import * as nodemailer from 'nodemailer'
import OTPModel from '../Models/OTPModel';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config(); 

const access_token_secret:string=process.env.ACCESS_TOKEN_SECRET?process.env.ACCESS_TOKEN_SECRET:''

const transporter = nodemailer.createTransport({
    port: 465,               
    host: "smtp.gmail.com",
       auth: {
            user: process.env.USER,
            pass: process.env.PASS,
         },
    secure: true,
    });

export const signup=async(req:any,resp:any)=>{
    const {firstname,lastname,email,password}=req.body
    const existingUser=await User.findOne({email:email})
    try{
    if(existingUser){
        resp.status(200).json({msg:"ExistingUser"});
    }
    else{
        await sendOTP(email);
        resp.status(200).json({msg:"OTPSENT"});
    }
}
catch(err:any){
resp.status(400).json({msg:err.message})
}
}

export const login=async(req:any,resp:any)=>{
    const {email,password}=req.body
    const existingUser=await User.findOne({email:email})
    try{
    if(existingUser){
    const isMatch=await bcrypt.compare(password,existingUser.password)
    if(isMatch){
        const token=jwt.sign({id:existingUser._id},access_token_secret)
        existingUser.password=''
        resp.status(200).json({msg:"LoginSuccessful",user:existingUser,token:token});
    }
    else{
        // const newUser=await User.create({firstname,lastname,email,password})
        resp.status(200).json({msg:"Password Invalid"});
    }
}
else{
    resp.status(200).json({msg:"Email Not Registered"});
}
}
catch(err:any){
resp.status(400).json({msg:err.message})
}
}

export const logout=()=>{
    console.log("Logout")
}

const sendOTP=async(email:string)=>{
    const otp:string=`${Math.floor(1000+Math.random() * 9000)}`
    const otpHash=await bcrypt.hash(otp,10)
   try{

    const newOTP=await OTP.create(
        {user:email,
        otp:otpHash, 
        createdAt:Date.now(),
        expiresAt:Date.now()+300000}
    )
    const mailData = {
        from: 'mitheshsrini@gmail.com',  
          to: email,   
          subject: 'OTP Verification',
          text: 'Hello world',
          html: `<b>Hey there! </b> <br> Please enter ${otp} for verification <br/>`,
        };
        transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err)
            else
             return(info);
         });

        }
        catch(err){
            console.log(err)
        }
         

}

export const verifyOTP=async(req:any,resp:any)=>{
    const {signupdata,otp}=req.body
    const{firstname,lastname,email,password}=signupdata

    const existingOTP=await OTPModel.findOne({user:signupdata.email})
    try{
    if(existingOTP){
    const isMatch=await bcrypt.compare(otp,existingOTP.otp)
    if(isMatch){
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=await User.create({firstname,lastname,email,password:hashedPassword})
       if(newUser){
        const deleteOTP=await OTPModel.deleteOne({_id:existingOTP._id})
        console.log(deleteOTP)
        const token=jwt.sign({id:newUser._id},access_token_secret)
        newUser.password=''
        resp.status(200).json({msg:"OTPVERIFIED",user:newUser,token:token});
       }
       else{
        resp.status(400).json({msg:"RESIGNUP"});
       }
    }
    else{
        // const newUser=await User.create({firstname,lastname,email,password})
        resp.status(200).json({msg:"OTPINVALID"});
    }
}
else{
    resp.status(400).json({msg:"NOENTRYFOUND"});
}
}
catch(err:any){
resp.status(400).json({msg:err.message})
}
}

export const resendOTP=async(req:any,resp:any)=>{
    try {
    const {email}=req.body;
    const existingOTP=await OTPModel.findOne({user:email})
    if(existingOTP){
    const deleteOTP=await OTPModel.deleteOne({_id:existingOTP._id})
    }
    await sendOTP(email);
    resp.status(200).json({msg:"OTPSENT"});

    } catch (error:any) {
        resp.status(400).json({msg:error.message});
    }
}