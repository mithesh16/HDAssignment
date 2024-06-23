import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'

import loginroutes from './Routes/LoginRoutes'
import dotenv from 'dotenv'; 
dotenv.config();

const app=express()
app.use(cors())

app.use(bodyparser.json()); // for parsing application/json
app.use(bodyparser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
    })
app.use('/',loginroutes)



mongoose.connect(process.env.URI?process.env.URI:'')
.then(()=>{
    app.listen(3000,()=>{
        console.log("Connected to DB Server listening at port 3000")
    })
}) 
.catch((err)=>{
    console.log(err)
})

