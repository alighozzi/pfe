const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Fournisseur = require('../../models/model.fournisseur/fournisseur.model')


router.get('/show/all/fournisseur',async (req,res) =>{
    await Fournisseur.find().populate("produits")
     .then(fournisseurs => res.json(fournisseurs))
     .catch(err => res.status(400).json('Error : ' + err))
  //populate est pour afficher le contenue du champs produit 
  })

module.exports = router