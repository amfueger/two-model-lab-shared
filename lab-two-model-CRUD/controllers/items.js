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


router.get('/new', (req, res) => {
	res.render('./items/new.ejs')
})

router.post('/', (req, res) => {
	Item.create(req.body, (err, createdItem) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/items')
		}
	})
})





























module.exports = router;