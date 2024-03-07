import dotenv from 'dotenv'
dotenv.config({path:"./src/.env"})
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { User } from './models/user.js'
import cookieParser from  'cookie-parser'



console.log(process.env.PORT)
const app= express()
app.use(express.json())
app.use(cors(
  {
    origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true
  }
    
));
app.use(cookieParser())

mongoose.connect(`${process.env.DB_URL}/User`).catch(error => handleError(error));

app.post('/user', async(req,res)=>
{ const {username}= req.body

    const checking= await User.findOne({username})
     console.log('this is what ia found in the database', checking)
    

 if(!checking)
 {
    
     await User.create(req.body)  
     res.status(200).json({isalreadyexist:false})
}
 else{ res.json({isalreadyexist:true})}
    
})

app.post('/login', async(req,res)=>
{

    const {username, password}= req.body
    const finding=   await User.findOne({username})
    console.log('this is the finding database of the user', finding)
    const result =  await finding.isPasswordCorrect(password)
    console.log('this is the after password checking', result)
    if(!result)
    {
         res.json({exist:false})
    }
    else  res.status(200).json({ exist: true });
})

app.get('/', (req,res)=>
{
    res.send('this is you home page ')
})

app.listen(process.env.PORT ||3001, ()=>
{
    console.log(`your backend server is runing at "http://localhost:${process.env.PORT}"`);
    

})
