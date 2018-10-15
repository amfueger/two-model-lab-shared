const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('./db/db');
const groceryController = require('./controllers/grocery');
const itemController = require('./controllers/items');
// const itemsController = require('./controllers/items');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//Controller
app.use('/grocery', groceryController);
app.use('/items', itemController);

//Index
app.get('/', (req, res) => {
	res.render('index.ejs');
})


//listen

app.listen(3000, () => {
	console.log("listening");
})