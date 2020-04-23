const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Fournisseur = require('../../models/model.fournisseur/fournisseur.model')

router.post('/add/fournisseur',  async (req,res) =>{
       
       const nom = req.body.nom
       const url= req.body.url
       const categorie = req.body.categorie
       const sous_categorie = req.body.sous_categorie
       const taux_reponse = Number(req.body.taux_reponse)
       const taux_livraison = Number(req.body.taux_livraison)
       const note_moyenne = Number(req.body.note_moyenne)
      
       const newFournisseur = new Fournisseur({
        nom,
        url,
        categorie,
        sous_categorie,
        taux_reponse,
        taux_livraison,
        note_moyenne
       
})
      await  newFournisseur.save()
          .then(()=> res.status(200).json('fournisseur ajouter avec succes'))
          .catch(err => res.status(400).json('Error :' + err)) 
 })


 module.exports = router