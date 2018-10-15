const express = require('express');
const router = express.Router();

const Grocery = require('../models/grocery');


router.get('/grocery/new', (req, res) => {
	res.render('./grocery/new.ejs', {
		grocery: Grocery
	})
})
router.post('/grocery', (req, res) => {
	Grocery.create(req.body, (err, createGrocery) => {
		if(err){
			console.log(err, "err");
		} else {
			res.redirect('/grocery')
		}
	});
});
router.get('/', (req, res) => {
	res.render('index.ejs')
})

router.get('/grocery', (req, res) => {
	res.render('./grocery/index.ejs')
})







module.exports = router;