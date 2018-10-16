const mongoose = require('mongoose');
const Grocery = require('/grocery');

const itemSchema = new mongoose.Schema({
    item: {type: String, required: true},
    available: Boolean,
    cost: Number,
    brand: String,
    store: [Grocery.schema]
})

module.exports = mongoose.model('Item', itemSchema);