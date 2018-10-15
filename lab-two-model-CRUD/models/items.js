const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	item: {type: String, required: true},
	available: Boolean,
	cost: Number,
	brand: String
})

module.exports = itemSchema;