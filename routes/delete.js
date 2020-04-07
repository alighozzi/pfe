const router = require('express').Router()
const  verify = require('../VerifyToken')
let User = require('../models/admin.model')

// Supprimer un user
router.delete('delete/:id', verify , async (req,res) =>{
     await User.findByIdAndDelete(req.params.id)
     .then(user => res.json('user deleted'))
     .catch(err => res.status(400).json('Error : ' + err))
  
}) 
// afficher tous les users
router.get('/show/all', verify , async (req,res) =>{
   await User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error : ' + err))

})
//modifier un user
router.post('/update/:id', verify, async (req,res) =>{
   await User.findById(req.params.id)
    .then(user => {
        user.firstname = req.body.firstname,
        user.lastname = req.body.lastname,
        user.email = req.body.email,
        user.password = req.body.password,

    //   await  
   user.save()
         .then(()=> res.status(200).json('user updated successfuly'))
         .catch(err => res.status(400).json('Error :' + err))
    })
    .catch(err => res.status(400).json('Error :' + err))
    

})
module.exports = router