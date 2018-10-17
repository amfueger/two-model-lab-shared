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
	Grocery.find({}, (err, foundGroceries) => {
		res.render('./items/new.ejs', {
			stores: foundGroceries
		});
	});
});

router.post('/', (req, res) => {
	const storeId = req.body.store;
		Grocery.findById(storeId, (err, foundStore) => {
			Item.create(req.body, (err, createdItem) => {
				console.log(foundStore.items);
				console.log(createdItem);
				foundStore.items.push(createdItem);
				foundStore.save();
		})
		res.redirect('/items');
		console.log(foundStore.items);
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
	Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
		Grocery.findOne({'items._id': req.params.id}, (err, foundGrocery) => {
			foundGrocery.items.id(req.params.id).remove();
			foundGrocery.items.push(updatedItem);
			foundGrocery.save();
			res.redirect('/items');
		})
	})
})

router.delete('/:id', (req, res) => {
	Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
		Grocery.findOne({'items._id': req.params.id}, (err, foundGrocery) => {
			foundGrocery.items.id(req.params.id).remove();
			foundGrocery.save();
			res.redirect('/items');
		})
	})
})



module.exports = router;