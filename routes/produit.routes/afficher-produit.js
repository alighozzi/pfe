const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Produit = require('../../models/model.produit.fournisseur/produit.model')

router.get('/show/all/produit',async (req,res) =>{
    await Produit.find().populate("couleurs").populate("images")
     .then(produits => res.json(produits))
     .catch(err => res.status(400).json('Error : ' + err))
  //populate est pour afficher le contenue du champs couleur et images
  })

module.exports = router