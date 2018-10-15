const mongoose = require('mongoose');


const grocerySchema = new mongoose.Schema({
	name: String,
	open: {
		type: Boolean,
		required: true
	},
	price: String


})

module.exports = mongoose.model('Grocery', grocerySchema);