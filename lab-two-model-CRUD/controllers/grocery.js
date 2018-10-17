const express = require('express');
const router = express.Router();

const Grocery = require('../models/grocery');
const Item = require('../models/items');

router.get('/new', async (req, res) => {
		try {
		res.render('./grocery/new.ejs',{
			grocery: Grocery
		})
		} catch(err){
			res.send(err, "err");
		}
		
	// res.render('./grocery/new.ejs', {
	// 	grocery: Grocery
	// })
})
router.post('/', async (req, res) => {
		try {
		const createGrocery = await Grocery.create(req.body);
		res.redirect('/grocery');
		} catch(err){
			res.send(err, "err");
		}
		
	// Grocery.create(req.body, (err, createGrocery) => {
	// 	if(err){
	// 		console.log(err, "err");
	// 	} else {
	// 		res.redirect('/grocery')
	// 	}
	// });
});

// router.get('/:id', (req, res) => {
	
// })
// router.get('/', (req, res) => {
// 	res.render('index.ejs')
// })

router.get('/', async (req, res) => {
		try {
		const findGrocery = await Grocery.find();
		res.render('./grocery/index.ejs',{
			grocery: findGrocery
		})
		} catch(err){
			res.send(err, "err");
		}
		
	// Grocery.find({}, (err, findGrocery) => {
	// 	res.render('./grocery/index.ejs', {
	// 		grocery:findGrocery
	// 	});
	// });	
});

router.get('/:id', (req, res) => {
	Grocery.findById(req.params.id, (err, foundGrocery) => {
		if(err) {
			console.log(err);
		} else {
			console.log(foundGrocery);
			res.render('./grocery/show.ejs', {
				grocery: foundGrocery
			})
		}
	})
})

router.get('/:id/edit', (req, res) => {
	Grocery.findById(req.params.id, (err, foundGrocery) => {
		if(err) {
			console.log(err);
		} else {
			res.render('./grocery/edit.ejs', {
				grocery: foundGrocery,
				id: req.params.id
			})
		}
	})
})


router.put('/:id', (req, res) => {
	Grocery.findByIdAndUpdate(req.params.id, req.body, (err, updatedGrocery) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/grocery');
		}
	})
})

router.delete('/:id', (req, res) => {
	Grocery.findByIdAndRemove(req.params.id, (err, deletedGrocery) => {
		res.redirect('/grocery');
	})
})


module.exports = router;