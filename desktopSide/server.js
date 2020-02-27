const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');

let outputFile = 'output.csv';
let allMatchFile = 'output.json'
const datamap = require('./public/datamap.js');

const opn = require('opn');

const dns = require('dns');
const request = require('request');
app.use('/submit', bodyParser.json());
app.use('/public', express.static('public'));
app.get('/', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, './public') });
});
//TODO: Make this work
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

class DataMap {
	constructor(data, cb) {
		this.sections = [];
		this.sectionData = [];
		this.components = [];
		this.variables = [];
		for (let section of data) {
			this.sections.push(section.title);
			let sectionData = [];
			this.components.push({
				title: section.title,
				type: "header"
			});
			for (let r of section.rows) {
				sectionData.push(r);
				this.components.push(r);
				if (Array.isArray(r)) {
					for (let i of r) {
						this.variables.push(i.id);
					}
				}
				this.variables.push(r.id);
			}
			this.sectionData.push(sectionData);
		}
		this.raw = data;
		this.data = {};
		for (let i of this.variables) {
			this.data[i] = 0;
		}
		this.cb = cb;
		this.key = 0;
	}
	updateData(newData) {
		this.data = newData;
		this.cb();
	}
	dataUpdated(newValue, id) {
		this.data[id] = newValue;
		this.cb();
	}
}

//module.exports = dataMap;
function getBits(component) {
	let range;
	if (component.type == 'picker') range = component.options.length;
	else if (component.type == 'slider') range = component.range[1];
	else if (component.type == 'toggle') {
		range = 1;
	}
	else if (component.id) range = 255;
	else range = 0;
	return Math.floor(Math.log2(range)) + 1;
}

function getBitSizes(dataMap) {
	let bitmap = {
		matchNumber: 12,
		teamNumber: 14
	};
	let d = new DataMap(dataMap, () => { });
	for (let i of d.components) {
		if (Array.isArray(i)) {
			for (let j of i) {
				if (!j.id) continue;
				bitmap[j.id] = getBits(j);
			}
		}
		else {
			if (!i.id) continue;
			bitmap[i.id] = getBits(i);
		}
	}
	return bitmap;
}

function genMapJS(dataMap) {
	const dmap = JSON.parse(dataMap.replace(/[^]+<div id="paste">([^]+?)<\/div>[^]+/g, "$1").replace(/(<\/?(span|p).*?>|&nbsp;)/g, ""));
	console.log(dmap);
	let bitmaps = {};
	for (let i in dmap) bitmaps[i] = getBitSizes(dmap[i].form);
	return `
		const formTypeBits = 4;
		let forms = ${JSON.stringify(dmap)};
		let bitmaps = ${JSON.stringify(bitmaps)};
	`
}

app.get('/map.js', function (req, res) {
	// Check if there is internet connection
	dns.resolve("freetexthost.net", function (err) {
		if (err) {
			fs.readFile('./datamap.json', (err, d) => res.send(genMapJS(d)));
		} else {
			request('https://freetexthost.net/IeXqmCs', function (err, r) {

				if (err) {
					throw err;
				}
				else {
					fs.writeFile('./datamap.json', r.body, function (err) {
						if (err) throw err;
					});
					res.send(genMapJS(r.body));
				}
			})
		}
	});
})

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
