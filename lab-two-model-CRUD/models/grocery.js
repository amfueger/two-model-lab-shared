const mongoose = require('mongoose');
const Item = require('./items');


const grocerySchema = new mongoose.Schema({
    name: String,
    open: {
        type: Boolean,
        required: true
    },
    price: String,
    items: [Item.schema]


})

module.exports = mongoose.model('Grocery', grocerySchema);