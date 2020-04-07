const router = require('express').Router()
let User = require('../models/admin.model')
const {UserRegister} = require('../Functions/RegisterFunction')

router.route('/admin').post(async (req,res) =>{
     
    await UserRegister(req.body , 'Admin' , res )
  
}) 

router.route('/super-admin').post(async (req,res) =>{
     
    await UserRegister(req.body , 'SuperAdmin' , res )
   
}) 
module.exports = router