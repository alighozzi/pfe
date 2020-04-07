const router = require('express').Router()
let User = require('../models/admin.model')

const {UserLogin} = require('../Functions/LoginFunction')

router.route('/admin').post(async (req,res) =>{
     
    await UserLogin(req.body , 'Admin' , res )
  
}) 

router.route('/super-admin').post(async (req,res) =>{
     
    await UserLogin(req.body , 'SuperAdmin' , res )
   
}) 
module.exports = router