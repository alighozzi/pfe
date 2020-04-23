const express = require('express')
const cors = require ('cors')
const mongoose= require('mongoose')
const dotenv = require('dotenv')
//import routes 
const userRegister = require ('./routes/user.routes/Register')
const userLogin = require ('./routes/user.routes/Login')
const userModifier =  require('./routes/user.routes/modifier')
const addFournisseur = require ('./routes/fournisseur.routes/add.fournisseur')
const addProduit = require('./routes/produit.routes/add.produit')
const addcouleur = require('./routes/produit.routes/add.couleur-produit')
const addImage = require('./routes/produit.routes/add.image-produit')
const afficherFournisseur = require('./routes/fournisseur.routes/afficher-fournisseurs')
const afficherProduit = require('./routes/produit.routes/afficher-produit')
const supprimerFournisseur= require('./routes/fournisseur.routes/modifier-fournisseur')
const supprimerproduit= require('./routes/produit.routes/modifier-produit')
const supprimercouleur= require('./routes/produit.routes/modifier-couleur')
const supprimerimage= require('./routes/produit.routes/modifier-image')
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
//rendre le dossier des images static => accessible 
app.use(express.static('uploads'))
//routes middleware 
app.use('/api' , userRegister)
app.use('/api' , userLogin)
app.use('/api' , userModifier)
app.use('/api' , addFournisseur)
app.use('/api' , addProduit)
app.use('/api' , addcouleur)
app.use('/api' , addImage)
app.use('/api' , afficherFournisseur)
app.use('/api' , afficherProduit)
app.use('/api' , supprimerFournisseur)
app.use('/api' , supprimerproduit)
app.use('/api' , supprimercouleur)
app.use('/api' , supprimerimage)

 app.listen(5000 , () =>{
     console.log('server is running')
 })