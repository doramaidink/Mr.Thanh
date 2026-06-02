const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const drinkInformation = new Schema({
    nameDrink :{type: String, required: true},
    image:{type: String, required: true},
    money:{type: String, required: true},
    status: { type: String, default: 'active' },
    review:{type: String, required: false},
     slug: { type: String, slug: 'nameDrink', unique: true },
     category: { type: String},
},{
    timestamps: true,
});
mongoose.plugin(slug);

module.exports = mongoose.model('drinkInformation', drinkInformation);