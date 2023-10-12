const express = require('express')
const mongoose = require('mongoose')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const postModel = require('../models/post')
const friendshipModel=require('../models/friendship')

const friendRouter = express.Router()

friendRouter.post("/friend/:id",async(req,res)=>{
    const token = req.headers.authorization
    const data = jwt.verify(token,"leo")
    const user1 = data.userId//sign in user
    const user2 = req.params.id
    const body = req.body
    const status = body.status

    const newFriend = new friendshipModel({
        user1:user1,
        user2:user2,
        status:"request sent"
    })
    await newFriend.save()
    res.send('friend request sent')
})

friendRouter.put("/friend/:id",async(req,res)=>{
    const token = req.headers.authorization
    const data = jwt.verify(token,"leo")
    const user2 = data.userId // try cache block
    const user1 = req.params.id
    const body = req.body
    const status = body.status
    const friendship = await friendshipModel.findOne({user1:user1,user2:user2}).exec()
    console.log(friendship)
    friendship.status=status
    await friendship.save()
    res.send('friend request accepted')
})



friendRouter.delete("/friend/:id",async(req,res)=>{
    const token = req.headers.authorization
    const data = jwt.verify(token,"leo")
    const user1 = data.userId//signin user ==>sudip
    const user2 = req.params.id//impact user ==>cyano
    const friendship = await friendshipModel.findOne( {$or: [
        {
            $and: [
                {
                    user1: user1
                }, {
                    user2: user2
                }
            ]
        }, {
            $and: [
                {
                    user1: user2
                },
                {
                    user2: user1
                }
            ]
        }
    ]}).exec()
    await friendshipModel.deleteOne({_id:friendship._id})
    res.send('friend request deleted')
})

friendRouter.get("/friend",async(req,res)=>{
    const token = req.headers.authorization
    const data = jwt.verify(token,"leo")
    const users = await userModel.find().exec()
    console.log(users)
    res.json(users)
})




module.exports=friendRouter