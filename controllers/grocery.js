const express = require('express');
const router = express.Router();

const Grocery = require('../models/grocery');


router.get('/grocery/new', (req, res) => {
	res.render('./grocery/new.ejs', {
		grocery: Grocery
	})
})
router.get('/', (req, res) => {
	res.render('index.ejs')
})

router.get('/grocery', (req, res) => {
	res.render('./grocery/index.ejs')
})







module.exports = router;