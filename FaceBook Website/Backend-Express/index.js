const mongoose = require('mongoose')
const express = require('express')
const cors =require('cors')
const authRouter=require('./routers/auth')
const postRouter=require('./routers/post')
const friendRouter = require('./routers/friend')
const profileRouter = require('./routers/profile')

const app = express()

app.use(express.json())
app.use(cors({
    origin:"*",
    allowedHeaders:"*",
    exposedHeaders:"*"
}))
app.use('/auth',authRouter)
app.use('/posts',postRouter)
app.use('/friends',friendRouter)
app.use('/profiles',profileRouter)

mongoose.connect("mongodb+srv://knockoutkeerthe:4QMFhjVa3St8Mynr@cluster0.mwbdwgm.mongodb.net/FB_Clone_Db?retryWrites=true&w=majority").then(()=>{
    console.log("connected to mongoDB")
    app.listen(8000)
})