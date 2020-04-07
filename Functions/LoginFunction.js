const User = require('../models/admin.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv= require('dotenv')
require('dotenv').config()
  
const UserLogin =  async (userData , role , res) => {
     try {
        //let {password} = userData 
        //validate the email
        const user =  await User.findOne({ email: userData.email })
        if (!user) return res.status(400).json('Email incorrect')

        //validate the password 
        const  validpass = await bcrypt.compare(userData.password , user.password)
        if (!validpass) return res.status(400).json('password correct please check again')
       
        //checking the role
         if (user.role != role)  return res.status(400).json("access denied ")
             
        //create and asign a token 
        let token = jwt.sign({_id: user._id , email: user.email} , process.env.TOKEN_SECRET, {expiresIn: "2 days"})
        //let result = {email: user.email, token: 'Bearer ', expiresIn: 48 }
        // return res.status(200).json({ 
        //     ...result
        // })
        //res.header('Bearer ' , token)
        res.header('Bearer ', token)
        res.send(token)

        
    
    }

    catch(err) { 
        res.status(400).json('something went wrong')
    }
    
}



module.exports = { UserLogin }