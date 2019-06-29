const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');

let outputFile = 'output.csv';
let allMatchFile = 'output.json'
const datamap = require('./public/datamap.js');

const opn = require('opn');

app.use('/submit', bodyParser.json());
app.use('/public', express.static('public'));
app.get('/', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, './public') });
});

function jsonToCSV(json) {
	let output = '';
	for (let i in json) {
		output += json[i][datamap.dataNames.matchInfo.teamNumber] +
			','
			+ json[i][datamap.dataNames.matchInfo.matchNumber] + ','
			+ json[i][datamap.dataNames.startLevel[0]] + ',';
		let hatches = [0, 0, 0, 0, 0];
		for (let j in datamap.dataNames.hatch) {
			hatches[json[i][datamap.dataNames.hatch[j]]]++;
		}
		// Swap cargo ship and the rockets
		let temp = hatches[1];
		hatches[1] = hatches[4];
		hatches[4] = temp;
		output += hatches.slice(1).join(',') + ',';

		let cargos = [0, 0, 0, 0, 0];
		for (let j in datamap.dataNames.cargo) {
			cargos[json[i][datamap.dataNames.cargo[j]]]++;
		}
		// Swap cargo ship and the rockets
		temp = cargos[1];
		cargos[1] = cargos[4];
		cargos[4] = temp;
		output += cargos.slice(1).join(',');

		// Tele-op
		output += ',' + json[i][datamap.dataNames.shipHatch[0]];
		for (let j in datamap.dataNames.rocketHatch) {
			output += ',' + json[i][datamap.dataNames.rocketHatch[j]];
		}
		output += ',' + json[i][datamap.dataNames.shipCargo[0]];
		for (let j in datamap.dataNames.rocketCargo) {
			output += ',' + json[i][datamap.dataNames.rocketCargo[j]];
		}
		output += ',' + json[i][datamap.dataNames.gameInfo.opposingSideTime];
		output += ',' +
			(json[i][datamap.dataNames.climbing.assist] > 0 ?
				json[i][datamap.dataNames.climbing.assist] + 1 :
				json[i][datamap.dataNames.climbing.assist]);

		output += ',' + json[i][datamap.dataNames.climbing.levelReached];
		output += ',' + Number(json[i][datamap.dataNames.attributes.tip]);

		output += ',' + Number(json[i][datamap.dataNames.attributes.broken]);
		output += ',' + Number(json[i][datamap.dataNames.attributes.hatchesFromFloor]);
		//output += ',' + Number(json[i][datamap.dataNames.attributes.cargoFromDepot]);
		//output += ',' + json[i][datamap.dataNames.gameInfo.penaltyPoints];
		output += ',' + json[i][datamap.dataNames.gameInfo.hatchesDropped];
		output += '\n';
	}
	return output;
}

let allMatches = JSON.parse((fs.readFileSync(allMatchFile) || "[]").toString());

app.post('/submit', function (req, res) {
	console.log(req.body);
	res.end("Recieved");
	for (let i = 0; i < req.body.length; i++) {
		let entered = false;
		for (let j = 0; j < allMatches.length; j++) {
			if (allMatches[j].matchNumber == req.body[i].matchNumber && allMatches[j].teamNumber == req.body[i].teamNumber) {
				entered = true;
				break;
			}
		}
		if (!entered) {
			allMatches.push(req.body[i]);
		}
	}
	console.log(allMatches);
	if (allMatches) {
		fs.writeFile(outputFile, jsonToCSV(allMatches), console.log.bind(console));
		fs.writeFile(allMatchFile, JSON.stringify(allMatches, null, 4), console.log.bind(console));
	}
})

app.listen(8080);

opn("http://localhost:8080");
