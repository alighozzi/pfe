const User = require('../../models/model.admin/admin.model')
const bcrypt = require('bcryptjs')
  
const UserRegister =  async (userData , role , res) => {
     try {
        //validate the email
        const emailExist =  await User.findOne({ email: userData.email })
        if (emailExist) return res.status(400).json('Email already taken')

        //validate the password 
        if (userData.password != userData.confirmpassword) 
        return res.status(400).json('password incorrect please check again ')
       
        //hashed the password 
        const hashedpassword = await  bcrypt.hash(userData.password , 12)
    
        //create a new user
        const newUser = new User({
               //...userData,
               firstname: userData.firstname,
               lastname: userData.lastname,
               email: userData.email,
               password: hashedpassword, 
               role: role
        })
          await  newUser.save()
           return res.status(200).json('user added')
    }catch(err) { 
        res.status(400).json('something went wrong')
    }
    }
module.exports = { UserRegister }