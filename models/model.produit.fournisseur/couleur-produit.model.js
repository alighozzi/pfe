const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CouleurSchema = new Schema({
    produit : {type:Schema.Types.ObjectId , ref: 'Produit'},
    couleur: {type:String , required: true  }
}, 
{timestamps: true}
)
const Couleur = mongoose.model('Couleurs_Produit', CouleurSchema)
module.exports = Couleur 