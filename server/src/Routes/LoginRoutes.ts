import express from 'express'

const router=express.Router()
import {signup,login,logout, verifyOTP} from '../Controllers/LoginController'

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/verifyotp',verifyOTP)
export default router;