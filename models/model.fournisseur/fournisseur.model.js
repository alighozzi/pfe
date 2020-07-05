const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FournisseurSchema = new Schema(
  {
    nom: { type: String, required: true, min: 3 },
    url: { type: String, required: true, min: 3 },
    categorie: [
      {
        type: String,
        required: true,
        enum: ["electronic", "beaute", "vetement"],
      },
    ],
    sous_categorie: [
      {
        type: String,
        required: true,
        enum: [
          "telephone",
          "laptop",
          "tablette",
          "creme",
          "pomade",
          "gel-douche",
          "pull",
          "tee-shirt",
          "pontalon",
        ],
        min: 3,
      },
    ],
    taux_reponse: { type: Number, required: true },
    taux_livraison: { type: Number, required: true },
    note_moyenne: { type: Number, required: true },
    produits: [{ type: Schema.Types.ObjectId, ref: "Produit" }],
    User: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const Fournisseur = mongoose.model("Fournisseur", FournisseurSchema);
module.exports = Fournisseur;
