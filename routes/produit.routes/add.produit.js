const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Produit = require('../../models/model.produit.fournisseur/produit.model')
let Fournisseur = require('../../models/model.fournisseur/fournisseur.model')

router.post('/add/:fournisseurID/produit',  async (req,res) =>{
       
       //trouver le fournisseur concerne
       const fournisseurConcerne = await Fournisseur.findOne({_id: req.params.fournisseurID}) 
       
       //creer le produit 
       const fournisseur = fournisseurConcerne._id
       const titre = req.body.titre
       const url = req.body.url
       const prix_unitaire = Number(req.body.prix_unitaire)
       const prix_vente_potentiel = Number(req.body.prix_vente_potentiel)
       const frais_port = Number(req.body.frais_port)
       const taille = req.body.taille
      
       const newProduit = new Produit({
        fournisseur,
        titre,
        url,
        prix_unitaire,
        prix_vente_potentiel,
        frais_port,
        taille
       })
           await  newProduit.save()
          .then(()=> res.status(200).json('produit ajouter avec succes'))
          .catch(err => res.status(400).json('Error :' + err))
    
     //associer le fournisseur avec le produit 
     fournisseurConcerne.produits.push(newProduit._id)
     await fournisseurConcerne.save()
     
 
 })

//  router.get('/show/all/produit',async (req,res) =>{
//   await Produit.find()
//    .then(produits => res.json(produits))
//    .catch(err => res.status(400).json('Error : ' + err))

// })
 module.exports = router