const mongoose =require('mongoose')

const friendshipSchema = mongoose.Schema({
    user1:mongoose.Types.ObjectId,
    user2:mongoose.Types.ObjectId,
    status:String
})

const friendshipModel =mongoose.model("friends",friendshipSchema)

module.exports = friendshipModel