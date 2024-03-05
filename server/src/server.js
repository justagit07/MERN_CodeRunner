import express from 'express'

const app = express()
app.get('/', (req,res)=>
{
    res.send('this is working route')
})
app.listen(3000, ()=>
{
    console.log('your server is working on the "http://localhost:3000"')
    
})