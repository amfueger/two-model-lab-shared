const express = require('express');
const router = express.Router();

const Item = require('../models/items');


router.get('/', (req, res) => {
	Item.find({}, (err, foundItems) => {
		if(err) {
			console.log(err);
		} else {
			res.render('./items/index.ejs', {
				items: foundItems
			})
		}
	})
})





























module.exports = router;