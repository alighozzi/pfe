const router = require('express').Router()
const  verify = require('../../VerifyToken')
let Produit = require('../../models/model.produit.fournisseur/produit.model')
let Image = require('../../models/model.produit.fournisseur/image-produit.model')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null , file.originalname)
    }
})
const filtrage = (req , file , cb) =>{
    //tester le type du fichier
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null , true)
    }else {
        cb(new Error('type non valide '), false)
    }
}
const upload = multer({ 
    storage,
    limits:{
        //taille de la photo ne doit pas passer 5Mo
        fieldSize: 1024 * 1023 * 5 
    },
    fileFilter:filtrage
})
router.post('/add/:produitID/image', upload.single('imageproduit'), async (req,res) =>{
       
    //trouver le produit  concerne
     const ProduitConcerne = await Produit.findOne({_id: req.params.produitID}) 
    //console.log(req.file)

    //stoke l'image 
     const produit = ProduitConcerne._id
     const images = req.file.path

     const newImage = new Image({
        produit,
        images
        })
          await  newImage.save()
          .then(()=> res.status(200).json('image ajouter avec succes'))
          .catch(err => res.status(400).json('Error :' + err))
 
     //associer le produit avec son image 
     ProduitConcerne.images.push(newImage._id)
     await ProduitConcerne.save()
  
})

module.exports = router