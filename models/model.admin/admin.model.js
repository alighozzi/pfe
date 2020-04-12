const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: {type:String , required: true , min : 3 },
    lastname: {type:String , required: true , min : 3},
    email: {type:String , required: true , min : 3},
    password: {type:String , required: true , min : 3},
    role: {type:String , default: 'Admin' , enum: ['Admin' , 'SuperAdmin']}
}, 
{timestamps: true}
)
const User = mongoose.model('User', UserSchema)
module.exports= User