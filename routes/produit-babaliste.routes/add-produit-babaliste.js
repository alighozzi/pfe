const router = require("express").Router();
const verify = require("../../VerifyToken");
let ProduitBabaliste = require("../../models/modele.produit.babaliste/produit-babaliste.modele");

router.post("/add/produit-babaliste", async (req, res) => {
  const titre = req.body.titre;
  const categorie = req.body.categorie;
  const sous_categorie = req.body.sous_categorie;
  const prix = Number(req.body.prix);
  const nomVendeur = req.body.nomVendeur;
  const typeVendeur = req.body.typeVendeur;
  const numeroVendeur = req.body.numeroVendeur;
  const emailVendeur = req.body.emailVendeur;
  const nbMessages = Number(req.body.nbMessages);
  const nbVues = Number(req.body.nbVues);
  const User = req.body.User;

  const newProduitBabaliste = new ProduitBabaliste({
    titre,
    categorie,
    sous_categorie,
    prix,
    nomVendeur,
    typeVendeur,
    numeroVendeur,
    emailVendeur,
    nbMessages,
    nbVues,
    User,
  });
  await newProduitBabaliste
    .save()
    .then(() => res.status(200).json("produit ajouter avec succes"))
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
