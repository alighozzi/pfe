const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    produit : {type:Schema.Types.ObjectId , ref: 'Produit'},
    images: {type:String , required: true  }
}, 
{timestamps: true}
)
const Image = mongoose.model('Images_Produit', ImageSchema)
module.exports = Image