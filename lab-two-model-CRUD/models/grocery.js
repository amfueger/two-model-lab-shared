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

const kale = new Item({item: 'kale'});

kale.save();

console.log(kale);
module.exports = mongoose.model('Grocery', grocerySchema);