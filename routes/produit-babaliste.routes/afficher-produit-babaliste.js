const router = require("express").Router();
const verify = require("../../VerifyToken");
let ProduitBabaliste = require("../../models/modele.produit.babaliste/produit-babaliste.modele");

//var startDate = new Date("2020-05-01").toISOString();
//var endDate = new Date("2020-05-08").toISOString();

router.get(
  "/show/all/produit-babaliste/:categorie/:sous_categorie/:nbaffichage/:startDate/:endDate/:selon",
  async (req, res) => {
    await ProduitBabaliste.find({
      createdAt: {
        $gte: req.params.startDate,
        $lt: req.params.endDate,
      },
      categorie: req.params.categorie,
      sous_categorie: req.params.sous_categorie,
    })
      .populate("images")
      //.populate("images")
      .sort({ [req.params.selon]: -1 })
      .limit(Number(req.params.nbaffichage))
      .then((produits) => res.json(produits))
      .catch((err) => res.status(400).json("Error : " + err));
  }
);

module.exports = router;
