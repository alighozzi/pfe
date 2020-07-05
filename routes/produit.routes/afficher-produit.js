const router = require("express").Router();
const verify = require("../../VerifyToken");
let Produit = require("../../models/model.produit.fournisseur/produit.model");

router.get("/show/produit/:id", async (req, res) => {
  await Produit.find({ fournisseur: req.params.id })
    .populate("couleurs")
    .populate("images")
    .then((produits) => res.json(produits))
    .catch((err) => res.status(400).json("Error : " + err));
  //populate est pour afficher le contenue du champs couleur et images
});

module.exports = router;
