const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Fournisseur = require('../../models/model.fournisseur/fournisseur.model')

// Supprimer un fournisseur
router.delete('/delete/fournisseur/:id',async (req,res) =>{
     await Fournisseur.findByIdAndDelete(req.params.id)
     .then(fournisseur => res.json('fournisseur deleted'))
     .catch(err => res.status(400).json('Error : ' + err))
  
}) 

//modifier un fournisseur
router.post('/update/fournisseur/:id', async (req,res) =>{
   await Fournisseur.findById(req.params.id)
    .then(fournisseur => {
        fournisseur.nom = req.body.nom,
        fournisseur.url = req.body.url,
        fournisseur.categorie = req.body.categorie,
        fournisseur.sous_categorie = req.body.sous_categorie,
        fournisseur.taux_reponse = Number(req.body.taux_reponse),
        fournisseur.taux_livraison = Number(req.body.taux_livraison),
        fournisseur.note_moyenne = Number(req.body.note_moyenne),

    //await  
   fournisseur.save()
         .then(()=> res.status(200).json('user updated successfuly'))
         .catch(err => res.status(400).json('Error :' + err))
    })
    
    

})
module.exports = router