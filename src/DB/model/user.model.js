export const users = []
import mongoose, { Schema } from "mongoose"
import { GenderEnum } from "../../common/enum/enumUser/index.js"
import { ProviderEnum } from "../../common/enum/provider/enum.js"
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25
    }
    ,
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    DOB: Date,
    password: {
        type: String,
        required: true,
        minLength: 8
    }
    ,
    gender: {
        type: String,
        enum: [GenderEnum.Male, GenderEnum.Female],
        default: GenderEnum.Male
    }
    , phone: String,
    confirmEmail: Date,
    provider: {
        type: String,
        enum: Object.values(ProviderEnum),
        default: ProviderEnum.System
    }, otp: String,
    otpExpire: Date,
    isVerified: {
        type: Boolean,
        default: false
    }
}
    , {
        collection: "Users",
        timestamps: true,
        strict: true,
        strictQuery: false
    }
)
userSchema.virtual('username').set(function (val) {
    const [firstName, lastName] = val?.split(' ') || []
    this.firstName = firstName
    this.lastName = lastName
}).get(function () {
    return this.firstName + " " + this.lastName
})
export const userModel = mongoose.model("Users", userSchema) 