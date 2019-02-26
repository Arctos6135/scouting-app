const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');

let outputFile = fs.createWriteStream('output.csv');

app.use('/submit', bodyParser.json());
app.use('/public', express.static('public'));
app.get('/', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, './public') });
});
app.post('/submit', function (req, res) {
	console.log(req.body);
	res.end("Recieved");
	let output = '';
	
})

app.listen(8080);