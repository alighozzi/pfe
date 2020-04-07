const express = require('express')
const cors = require ('cors')
const mongoose= require('mongoose')
const dotenv = require('dotenv')
//import routes 
const userRegister = require ('./routes/Register')
const userLogin = require ('./routes/Login')
const userDelete =  require('./routes/delete')
require('dotenv').config()

const app = express()
app.use(cors())

//read data with format json , create am express application
app.use(express.json())
//connection to database
const URL = process.env.BD_URL
mongoose.connect(URL , {useNewUrlParser : true , useUnifiedTopology: true } , () =>{
    console.log('connection to database is established successfully')
})

//routes middleware 
app.use('/api/add' , userRegister)
app.use('/api/login' , userLogin)
app.use('/api' , userDelete)



 app.listen(5000 , () =>{
     console.log('server is running')
 })