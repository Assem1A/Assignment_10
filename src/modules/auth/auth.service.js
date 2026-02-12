import { compare, hash } from "bcrypt"
import { ProviderEnum } from "../../common/enum/provider/enum.js"
import { userModel } from "../../DB/model/index.js"
import { JWT_EXPIRES, JWT_SECRET, SALT_ROUND } from "../../../config/config.service.js"
import jwt from 'jsonwebtoken'
import { generateOTP } from "../../utils/generateOTP.js"

export const signup = async (inputs) => {
const {email,password,username}=inputs
const user=await userModel.findOne({email})
const hashed=await hash(password,SALT_ROUND)
if(user)throw new Error("duplicated email",{cause:{status:409}})
    const otp = generateOTP()

const [addedUser]=await userModel.create([{username,password:hashed,email,provider:ProviderEnum.Systemوotp,
  otpExpire: Date.now() + 10 * 60 * 1000}])
  await sendEmail({
  to: email,
  subject: "Verify your email",
  html: `<h2>Your OTP: ${otp}</h2>`
})
return addedUser
}
export const login = async (body) => {
    const {email,password}=body
    const user = await userModel.findOne({ email })
    if (!user) throw new Error("invalid email or password", { cause: { status: 404 } });
    const wrongPassword=!await compare(password,user.password)
    if(wrongPassword)throw new Error("invalid email or password", { cause: { status: 404 } });

    const token = jwt.sign(
        { id: user._id, email },
       JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    );

    return {user,token}
}
export const verifyEmail = async (body) => {

    const { email, otp } = body

    const user = await userModel.findOne({ email })

    if (!user) throw new Error("User not found",{cause:{status:404}})

    if (user.otp !== otp)
      throw new Error("Invalid OTP",{cause:{status:400}})

    if (user.otpExpire < Date.now())
      throw new Error("OTP expired",{cause:{status:400}})

    user.isVerified = true
    user.otp = undefined
    user.otpExpire = undefined

    await user.save()


  
}
