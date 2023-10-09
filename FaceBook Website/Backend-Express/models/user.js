const mongoose =require('mongoose')

const userSchema = mongoose.Schema({
        mailId :String,
        passwordHash:String
})

const userModel =mongoose.model("Users",userSchema)

module.exports=userModel