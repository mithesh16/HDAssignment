import mongoose from  'mongoose'
const Schema =mongoose.Schema

export const otpVerification=new Schema({
    user:{
        type: String,
        required:true},
    otp:{
        type: String,
        required:true},
    createdAt:{
        type: Date,
        required:true},
    expiresAt:{
        type: Date,
        required:true},

})
export default mongoose.model('otp', otpVerification);