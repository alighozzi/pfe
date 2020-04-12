const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Produit = require('../../models/model.produit.fournisseur/produit.model')
let Couleur = require('../../models/model.produit.fournisseur/couleur-produit.model')
router.post('/add/:produitID/couleur',  async (req,res) =>{
       
    //trouver le produit  concerne
    const ProduitConcerne = await Produit.findOne({_id: req.params.produitID}) 
    
    //creer la couleur 
    const produit = ProduitConcerne._id
    const couleur = req.body.couleur
    
    const newCouleur = new Couleur({
     produit,
     couleur,
     
    })
        await  newCouleur.save()
       .then(()=> res.status(200).json('couleur ajouter avec succes'))
       .catch(err => res.status(400).json('Error :' + err))
 
  //associer le produit avec la couleur  
  ProduitConcerne.couleurs.push(newCouleur._id)
  await ProduitConcerne.save()
  
})

module.exports = router