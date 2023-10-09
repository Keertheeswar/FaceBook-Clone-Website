const mongoose =require('mongoose')

const postSchema = mongoose.Schema({
    title:String,
    imageUrl:String,
    likes:[mongoose.Types.ObjectId],
    userId:mongoose.Types.ObjectId
})

const postModel =mongoose.model("Posts",postSchema)

module.exports = postModel