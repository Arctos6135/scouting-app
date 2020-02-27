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
	const yes_no = [
		"aml",
		"arct",
		"arft",
		"arr",
		"arp",
		"trg",
		"trh",
		"tps",
		"tpp",
		"lt",
		"ao",
		"ad",
		"ab",
		"at"
	] // all the variables that are either yes or no and are converted to 1 or 0

	let output = '';
	for (let i in json) {
		console.log("i is", i)
		let match = json[i]
		console.log("match is", match)
		let entries = Object.entries(match)

		output += match.teamNumber + ',' + match.matchNumber + ','
		
		for (let en in entries) {
			e = entries[en]
			console.log("entry is", e)
			// e[0] is the key, e[1] is the value
			let v; // the value that will go in this column

			if (yes_no.includes(e[0])) {
				v = (e[1] === "Yes") ? 1 : 0; 
			}
			else if (e[0] === "adp" || e[0] === "tdp") { // dispense to alliance partners in auto and teleop, respectively
				/* 
				two columns, attempted and successful
				if no, 0 in both
				if attempted, 1 and then 0
				if successful, 0 and then 1
				*/
				if (e[1] === "No") {
					v = "0,0"
				}
				else if (e[1] === "Attempted") {
					v = "1,0"
				}
				else {
					v = "0,1"
				}
			}
			else if (e[0] === "el") { // endgame level
				/*
				two columns, park and hang
				if none, 0 in both
				if park, 1 and 0
				if hang, 0 and 1
				*/
				if (e[1] === "None") {
					v = "0,0"
				}
				else if (e[1] === "Park") {
					v = "1,0"
				}
				else {
					v = "0,1"
				}
			}
			else if (e[0] == "ea") { // endgame assist
				/*
				two columns, was assisted and assisted another
				if none, 0 in both
				if was assisted, 1 and 0
				if assisted another, 0 and 1
				*/
				if (e[1] === "None") {
					v = "0,0"
				}
				else if (e[1] === "Was assisted") {
					v = "1,0"
				}
				else if (e[1] === "Assisted another") {
					v = "0,1"
				}
			}
			else if (e[0] === "teamNumber" || e[0] === "matchNumber") {
				continue; // we already added team and match number
			} 
			else { // all the other numerical values
				v = e[1]
			}
			console.log("v is", v)

			v += "," // add a trailing comma
			output += v // append the value(s) to the output
		}
		
		// remove a trailing comma at the end of the row if it exists
		if (output.charAt(output.length - 1) === ",") {
			output = output.substring(0, output.length-1)
		}

		// finish the row with a newline
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
