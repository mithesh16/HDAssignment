export type signupdata={
    firstname:string,
    lastname:string
    email:string
    password:string
}

export type logindata={
    email:string
    password:string
}

export type otpdata={
    user:string,
    otp:string,
    createdAt:Date,
    expiresAt:Date
}
