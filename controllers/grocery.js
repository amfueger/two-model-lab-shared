const express = require('express');
const router = express.Router();

const Grocery = require('../models/grocery');


router.get('/new', (req, res) => {
	res.render('/grocery/new.ejs')
})








module.exports = router;