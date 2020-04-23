const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Couleur = require('../../models/model.produit.fournisseur/couleur-produit.model')

// Supprimer un fournisseur
router.delete('/delete/couleur/:id',  async (req,res) =>{
     await Couleur.findByIdAndDelete(req.params.id)
     .then(couleur => res.json('couleur deleted'))
     .catch(err => res.status(400).json('Error : ' + err))
  
}) 

//modifier un couleur
router.post('/update/couleur/:id',  async (req,res) =>{
   await Couleur.findById(req.params.id)
    .then(color => {
        color.couleur = req.body.couleur,

    //await  
   color.save()
         .then(()=> res.status(200).json('couleur updated successfuly'))
         .catch(err => res.status(400).json('Error :' + err))
    })
    .catch(err => res.status(400).json('Error :' + err))
    

})
module.exports = router