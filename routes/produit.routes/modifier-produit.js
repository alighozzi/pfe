const router = require("express").Router();
const verify = require("../../VerifyToken");
let Produit = require("../../models/model.produit.fournisseur/produit.model");
//let Fournisseur = require("../../models/model.fournisseur/fournisseur.model");

router.get(
  "/show/unproduit/:id",
  //   verify,

  async (req, res) => {
    await Produit.findById(req.params.id)
      .then((produit) => res.json(produit))
      .catch((err) => res.status(400).json("Error : " + err));
  }
);

// Supprimer un produit
router.delete("/delete/produit/:id", async (req, res) => {
  await Produit.findByIdAndDelete(req.params.id)
    .then((produit) => res.json("produit deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
});

//modifier un produit
router.post("/update/produit/:idproduit", async (req, res) => {
  //chercher le fournisseur concerne
  // const fournisseur_concerne = await Fournisseur.findOne({_id: req.params.idfournisseur})
  //chercher le produit a modifier
  await Produit.findById(req.params.idproduit).then((produit) => {
    //produit.fournisseur = fournisseur_concerne._id;
    (produit.titre = req.body.titre),
      (produit.url = req.body.url),
      (produit.prix_unitaire = Number(req.body.prix_unitaire)),
      (produit.prix_vente_potentiel = req.body.prix_vente_potentiel),
      (produit.frais_port = Number(req.body.frais_port)),
      (produit.taille = req.body.taille),
      produit
        .save()
        .then(() => res.status(200).json("produit updated successfuly"))
        .catch((err) => res.status(400).json("Error :" + err));
  });

  // fournisseur_concerne.produits.push(produit._id)
  // await fournisseur_concerne.save()
});

module.exports = router;
// /:idfournisseur
