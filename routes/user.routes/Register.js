const router = require('express').Router()
let User = require('../../models/model.admin/admin.model')
const {UserRegister} = require('../../Functions/Function.admin/RegisterFunction')

router.route('/add/admin').post(async (req,res) =>{
     
    await UserRegister(req.body , 'Admin' , res )
  
}) 

router.route('/add/super-admin').post(async (req,res) =>{
     
    await UserRegister(req.body , 'SuperAdmin' , res )
   
}) 
module.exports = router