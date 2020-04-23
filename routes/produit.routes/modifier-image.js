const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Image = require('../../models/model.produit.fournisseur/image-produit.model')

// Supprimer un fournisseur
router.delete('/delete/image/:id',  async (req,res) =>{
     await Image.findByIdAndDelete(req.params.id)
     .then(image => res.json('image deleted'))
     .catch(err => res.status(400).json('Error : ' + err))
  
}) 

// //modifier un image
// router.post('/update/image/:id', verify, async (req,res) =>{
//    await image.findById(req.params.id)
//     .then(image => {
        

//     //await  
//    image.save()
//          .then(()=> res.status(200).json('user updated successfuly'))
//          .catch(err => res.status(400).json('Error :' + err))
//     })
//     .catch(err => res.status(400).json('Error :' + err))
    

// })
module.exports = router