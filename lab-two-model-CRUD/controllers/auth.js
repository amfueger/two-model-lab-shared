const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

//login render
router.get('/login', (req, res) => {
	res.render('auth/login.ejs', {
		message: req.session.message
	})
});

//Register Post
router.post('/register', async (req, res) => {
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const userEntry = {};
	userEntry.username = req.body.username;
	userEntry.password = passwordHash;
	const user = await User.create(userEntry);
	req.session.logged = true;
	req.session.message = '';
	res.redirect('/authors');
});

//Login Post
router.post('/login', async (req, res) => {
		try {
		const foundUser = await User.findOne({username: req.body.username});
		if(foundUser && bcrypt.compareSync(req.body.password, foundUser.password)){
			res.redirect('/authors')
		} else {
			req.session.message = "Username or Password is incorrect"
			res.redirect('/auth/login')
		}
		} catch(err){
			res.send(err, "err");
		}
		
});


//Logout Get
router.get('/logout', async (req, res) => {
		try {
		req.session.destroy();
		res.redirect('/auth/login');
		} catch(err){
			res.send(err, "err");
		}
		
})

module.exports = router;