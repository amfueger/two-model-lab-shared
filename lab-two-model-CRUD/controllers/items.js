const express = require('express');
const router = express.Router();

const Item = require('../models/items');
const Grocery = require('../models/grocery');


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
		let store = new Grocery({name: req.body.store});
		store.items.push(createdItem);
		store.save();
		if(err) {
			console.log(err);
		} else {
			console.log(store);
			res.redirect('/items')
		}
	})
})


router.get('/:id', (req, res) => {
	Item.findById(req.params.id, (err, foundItem) => {
		res.render('./items/show.ejs', {
			item: foundItem
		})
	})
})


router.get('/:id/edit', (req, res) => {
	Item.findById(req.params.id, (err, foundItem) => {
		if(err) {
			console.log(err);
		} else {
			res.render('./items/edit.ejs', {
				item: foundItem,
				id: req.params.id
			})
		}
	})
})

router.put('/:id', (req, res) => {
	Item.findByIdAndUpdate(req.params.id, req.body, (err, updatedItem) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/items');
		}
	})
})

router.delete('/:id', (req, res) => {
	Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
		res.redirect('/items');
	})
})



























module.exports = router;