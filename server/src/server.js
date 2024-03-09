import dotenv from 'dotenv'
dotenv.config({ path: "./src/.env" })
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { User } from './models/user.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'


console.log(process.env.PORT)
const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }

));

mongoose.connect(`${process.env.DB_URL}/User`).catch(error => handleError(error));
const verify= (req, res, next)=>
{ 
    const {Acesstoken}= req.cookies
    console.log('this is req.cookies', req.cookies)
    console.log(Acesstoken)
       if(!Acesstoken){
        return res.json('the token was not there')
       }
       else
       {
        jwt.verify(Acesstoken,`${process.env.ACCESS_TOKEN_SECRET}`,(err,decoded)=>
        {
            if(err)
            {
               return res.json("you Access token is invalid/wrong")
            }
            next()
        })
       }

}
app.use(cookieParser())


app.get('/home', verify, async(req,res)=>
{
    return res.json('sucess')
})

app.post('/user', async (req, res) => {
    const { username } = req.body

    const checking = await User.findOne({ username })
    console.log('this is what ia found in the database', checking)


    if (!checking) {

        await User.create(req.body)
        res.status(200).json({ isalreadyexist: false })
    }
    else { res.json({ isalreadyexist: true }) }

})

app.post('/login', async (req, res) => {

    const { username, password } = req.body
    console.log('this is req.body', req.body);
    
    const finding = await User.findOne({ username }).catch(e=>console.log('this is what i catch', e))
    console.log('this is the finding database of the user', finding)
    if(finding)
    {
        const result = await finding.isPasswordCorrect(password)

        console.log('this is the after password checking', result)
        if (result) {
            const  Acesstoken= await finding.createAcessToken()
            // const  Refreshtoken= await finding.createRefreshToken()
            res.cookie("Acesstoken", Acesstoken)
            // res.cookie("  Refresh token is:", Refreshtoken)
            res.json({ exist: true });
            
        }
        else 
        {     console.log('this is run because there is no user exist ')
           return res.json({ exist: false })
        }

    }
    else(res.send(404))
})

app.get('/', (req, res) => {
    res.send('this is you home page ')
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`your backend server is runing at "http://localhost:${process.env.PORT}"`);


})
