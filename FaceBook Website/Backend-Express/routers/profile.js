const express = require('express')
const mongoose = require('mongoose')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const friendshipModel = require('../models/friendship')

const profileRouter = express.Router()

profileRouter.get("/profile/:id", async (req, res) => {
    const token = req.headers.authorization
    const data = jwt.verify(token, "leo")
    const user1 = data.userId//signin user
    const user2 = req.params.id
    console.log(user1,user2)
    const user = await userModel.findById(user2)
    const friendship = await friendshipModel.findOne({
        $or: [
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
        ]
    }).exec()
   console.log(user.mailId,friendship.status)
    res.send("profile viewed")
})

module.exports=profileRouter