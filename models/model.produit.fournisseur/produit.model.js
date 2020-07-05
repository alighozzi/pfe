const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProduitSchema = new Schema(
  {
    fournisseur: { type: Schema.Types.ObjectId, ref: "Fournisseur" },
    titre: { type: String, required: true, min: 3 },
    url: { type: String, required: true, min: 3 },
    prix_unitaire: { type: Number, required: true, min: 3 },
    prix_vente_potentiel: { type: Number, required: true },
    frais_port: { type: Number, required: true },
    taille: [{ type: String, required: true, enum: ["S", "M", "L", "XL"] }],
    images: [{ type: Schema.Types.ObjectId, ref: "Images_Produit" }],
    couleurs: [{ type: Schema.Types.ObjectId, ref: "Couleurs_Produit" }],
  },
  { timestamps: true }
);
const Produit = mongoose.model("Produit", ProduitSchema);
module.exports = Produit;
