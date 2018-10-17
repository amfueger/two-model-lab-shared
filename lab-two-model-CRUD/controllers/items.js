const express = require('express');
const router = express.Router();

const Item = require('../models/items');
const Grocery = require('../models/grocery');


router.get('/', async (req, res) => {
	try {
		const foundItems = await Item.find({});
		res.render('./items/index.ejs', {
			items: foundItems
		})
	} catch (err) {
		res.send(err);
	}
})


router.get('/new', async (req, res) => {
	try {
		const foundGroceries = await Grocery.find({});
		res.render('./items/new.ejs', {
			stores: foundGroceries
		})
	} catch (err) {
		res.send(err)
	}
	// Grocery.find({}, (err, foundGroceries) => {
	// 	res.render('./items/new.ejs', {
	// 		stores: foundGroceries
	// 	});
	// });
});

router.post('/', async (req, res) => {
	try {
		const storeId = req.body.store;
		const foundStore = await Grocery.findById(storeId);
		const createdItem = await Item.create(req.body);
		console.log(foundStore, 'store before editing ');
		foundStore.items.push(createdItem);
		foundStore.save();
		console.log(foundStore, 'the found store');
		res.redirect('/items')

	} catch (err) {
		res.send(err)
	}
	// const storeId = req.body.store;
	// 	Grocery.findById(storeId, (err, foundStore) => {
	// 		Item.create(req.body, (err, createdItem) => {
	// 			console.log(foundStore.items);
	// 			console.log(createdItem);
	// 			foundStore.items.push(createdItem);
	// 			foundStore.save();
	// 	})
	// 	res.redirect('/items');
	// 	console.log(foundStore.items);
	// })
})


router.get('/:id', async (req, res) => {
	try {
		const foundItem = await Item.findById(req.params.id);
		res.render('./items/show.ejs', {
			item: foundItem
		})
	} catch (err) {
		res.send(err)
	}



	// Item.findById(req.params.id, (err, foundItem) => {
	// 	res.render('./items/show.ejs', {
	// 		item: foundItem
	// 	})
	// })
})


router.get('/:id/edit', async (req, res) => {
		try {
		const foundItem = await Item.findById(req.params.id);
		res.render('./items/edit.ejs', {
			item: foundItem,
			id: req.params.id
		})
		} catch(err){
			res.send(err, "err");
		}
		
	


	// Item.findById(req.params.id, (err, foundItem) => {
	// 	if(err) {
	// 		console.log(err);
	// 	} else {
	// 		res.render('./items/edit.ejs', {
	// 			item: foundItem,
	// 			id: req.params.id
	// 		})
	// 	}
	// })
});

router.put('/:id', async (req, res) => {
	try {
	const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
	const foundGrocery = await Grocery.findOne({'items._id': req.params.id});
	foundGrocery.items.id(req.params.id).remove();
	foundGrocery.items.push(updatedItem);
	foundGrocery.save();
	res.redirect('/items');
	} catch(err){
		res.send(err, "err");
	}
	
	// Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
	// 	Grocery.findOne({'items._id': req.params.id}, (err, foundGrocery) => {
	// 		foundGrocery.items.id(req.params.id).remove();
	// 		foundGrocery.items.push(updatedItem);
	// 		foundGrocery.save();
	// 		res.redirect('/items');
	// 	})
	// })
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