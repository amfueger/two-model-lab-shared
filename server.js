const express = express('require');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('.db/db');

const groceryController = require('./controllers/grocery');
// const itemsController = require('./controllers/items');

app.listen(3000, () => {
	console.log(listening);
})