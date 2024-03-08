import dotenv from 'dotenv'
dotenv.config({path:'./.env'})
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const User_schema=   new mongoose.Schema(
    {
        username: String,
        password: String,
        refreshToken:String
    }
)

User_schema.pre("save",   async function (){
   this.password=  await bcrypt.hash(this.password, 10)

})



User_schema.methods.isPasswordCorrect= async function (password)
{
   return  await bcrypt.compare(password, this.password) 
}
User_schema.methods.createAcessToken = async function()
{ 

    return jwt.sign({
        _id:this._id,
        username:this.username,
    },`${process.env.ACCESS_TOKEN_SECRET}`,{expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}`})
}
User_schema.methods.createRefreshToken = async function()
{
    return jwt.sign({
        _id:this._id,
        username:this.username,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}
 export const User= mongoose.model("User", User_schema)

