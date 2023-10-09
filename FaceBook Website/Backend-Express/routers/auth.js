const express = require('express')
const mongoose =require('mongoose')
const userModel = require('../models/user')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')

const authRouter =express.Router()

authRouter.post("/signup",async(req,res)=>{
    const body =req.body
    const mailId =body.mailId
    const password=body.password

    const existingUser =await userModel.findOne({mailId:mailId}).exec()
    if(existingUser){
        return res.send("user aldready exist")
    }
    const hashPassword = bcrypt.hashSync(password,10)
    const newUser = new userModel({
        mailId:mailId,
        passwordHash:hashPassword
    })
    await newUser.save()
    res.send("new user created")
})

authRouter.post("/signin",async(req,res)=>{
    const body =req.body
    const mailId =body.mailId
    const password=body.password

    const existingUser =await userModel.findOne({mailId:mailId}).exec()
    if(!existingUser){
        return res.send("user doesn't exist")
    }
    const isPasswordMatch=bcrypt.compareSync(password,existingUser.passwordHash)
    if(!isPasswordMatch){
        return res.send("passeord doesn't match")
    }
    const token = jwt.sign({userId:existingUser._id},"leo")
    res.set('authorization',token)
    res.send("signin successful")
})


module.exports = authRouter