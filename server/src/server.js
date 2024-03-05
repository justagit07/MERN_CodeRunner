import dotenv from 'dotenv'
dotenv.config({path:"./src/.env"})
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'




console.log(process.env.PORT)
const app= express()
app.use(express.json)
app.use(cors())
mongoose.connect()
app.get('/', (req,res)=>
{
    res.send('this is you home page ')
})
app.listen(process.env.PORT ||3001, ()=>
{
    console.log(`your backend server is runing at "http://localhost:${process.env.PORT}"`);
    

})