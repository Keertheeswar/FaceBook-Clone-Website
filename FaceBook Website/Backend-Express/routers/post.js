const express = require('express')
const mongoose = require('mongoose')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const postModel = require('../models/post')


const postRouter = express.Router()

const currentUserData = () => {
    const body = req.body
    const title = body.title
    const imageUrl = body.imageUrl

    const token = req.headers.authorization
    const data = jwt.verify(token, "leo")
}
postRouter.post("/post", async (req, res) => {
    const body = req.body
    const title = body.title
    const imageUrl = body.imageUrl

    const token = req.headers.authorization
    const data = jwt.verify(token, "leo")
    const userId = data.userId

    const newPost = new postModel({
        title: title,
        imageUrl: imageUrl,
        likes: [],
        userId: userId
    })
    await newPost.save()
    res.send("post created")
})

postRouter.delete("/post/:id", async (req, res) => {
    const token = req.headers.authorization
    const data = jwt.verify(token, "leo")
    if (!data) {
        return res.send("you should have logged in to perform this action")
    }
    const userId = data.userId
    const post = await postModel.findById(req.params.id).exec()
    // console.log(userId,post.userId.toString())
    if (userId === post.userId.toString()) {
        const postId = req.params.id
        await postModel.deleteOne({ _id: postId })
        res.send("post deleted")
    }
})

postRouter.put("/post/:id", async (req, res) => {
    const token = req.headers.authorization
    const data = jwt.verify(token, "leo")//keep the check for user
    if (!data) {
        return res.send("you should have logged in to perform this action")
    }
    const userId = data.userId
    const body = req.body
    const title = body.title
    const imageUrl = body.imageUrl

    const post = await postModel.findById(req.params.id).exec()
    if (userId === post.userId.toString()) {
        post.title = title
        post.imageUrl = imageUrl
        await post.save()
        res.send("post updated")
    }

})

postRouter.post("/post/:id/like", async (req, res) => {
    const token = req.headers.authorization
    const data = jwt.verify(token, "leo")
    if (!data) {
        return res.send("you should have logged in to perform this action")
    }
    const post = await postModel.findById(req.params.id).exec()
    const userId = data.userId
    console.log(post)

    if (post.likes.indexOf(userId) !== -1) {
        return res.send("you have aldready liked the post")
    } else {
        post.likes.push(userId)
        await post.save()
        return res.send("post liked")
    }
})
postRouter.post("/post/:id/dislike", async (req, res) => {
    const token = req.headers.authorization
    const data = jwt.verify(token, "leo")
    if (!data) {
        return res.send("you should have logged in to perform this action")
    }
    const post = await postModel.findById(req.params.id).exec()
    const userId = data.userId


    if (post.likes.indexOf(userId) !== -1) {
        const userIndex = post.likes.indexOf(userId)
        post.likes.splice(userIndex, 1)
        await post.save()
        return res.send("user like removed")
    } else {
        return res.send("user need to like the post first")
    }

})

postRouter.get("/post", async (req, res) => {
    const token = req.headers.authorization
    const data = jwt.verify(token, "leo")
    if (!data) {
        return res.send("you should have logged in to perform this action")
    }
    const posts = await postModel.find()
    res.send(posts)



})




module.exports = postRouter