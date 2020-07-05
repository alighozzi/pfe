const router = require("express").Router();
const verify = require("../../VerifyToken");
let Produit = require("../../models/modele.produit.babaliste/produit-babaliste.modele");
let Image = require("../../models/modele.produit.babaliste/image-produit-babaliste.modele");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploadBabaliste/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const filtrage = (req, file, cb) => {
  //tester le type du fichier
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("type non valide "), false);
  }
};
const upload = multer({
  storage,
  limits: {
    //taille de la photo ne doit pas passer 5Mo
    fieldSize: 1024 * 1023 * 5,
  },
  fileFilter: filtrage,
});
router.post(
  "/add/image/:produitbabalisteID",
  upload.single("imageproduitbabaliste"),
  async (req, res) => {
    //trouver le produit  concerne
    const ProduitConcerne = await Produit.findOne({
      _id: req.params.produitbabalisteID,
    });
    //console.log(req.file)

    //stoke l'image
    const produit = ProduitConcerne._id;
    const images = req.file.path;

    const newImage = new Image({
      produit,
      images,
    });
    await newImage
      .save()
      .then(() => res.status(200).json("image ajouter avec succes"))
      .catch((err) => res.status(400).json("Error :" + err));

    //associer le produit avec son image
    ProduitConcerne.images.push(newImage._id);
    await ProduitConcerne.save();
  }
);

module.exports = router;
