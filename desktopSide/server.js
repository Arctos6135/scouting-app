const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

app.use('/submit', bodyParser.json());
app.use('/public', express.static('public'));
app.get('/', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, './public') });
});
app.post('/submit', function (req, res) {
	console.log(req.body);
})

app.listen(8080);