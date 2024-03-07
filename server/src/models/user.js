import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const User_schema=   new mongoose.Schema(
    {
        username: String,
        password: String,
    }
)

User_schema.pre("save",   async function (){
   this.password=  await bcrypt.hash(this.password, 10)

})



User_schema.methods.isPasswordCorrect= async function (password)
{
   return  await bcrypt.compare(password, this.password) 
}
 export const User= mongoose.model("User", User_schema)

