
let bitmap = {};

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

bitmap = getBitSizes(dataMap.dmap);

function generateBuffer(data) {
	let length = 0;
	let buffer = [];

	console.log(bitmap);

	for (let i in bitmap) {
		if (!i) continue;
		buffer.push(...(Math.round(data[i] || 0).toString(2).padStart(bitmap[i], '0')));
		console.log((Math.round(data[i] || 0).toString(2).padStart(bitmap[i], '0')), i, data[i]);
	}
	// Generate the string from that
	let arr = new Uint16Array(Math.ceil(buffer.length / 16));
	for (let i = 0; i < buffer.length; i++) {
		let idx = Math.floor(i / 16);
		arr[idx] <<= 1;
		arr[idx] += parseInt(buffer[i]);
	}
	let output = "";
	for (let c of arr) output += String.fromCharCode(c);
	return output;
}
function generateQRCode(allData) {
	let data = [];
	for (let i in allData) {
		if (!allData[i].deleted) data.push(allData[i]);
	}
	let output = String.fromCharCode(data.length);
	for (let i in data) {
		output += generateBuffer(data[i]);
	}
	console.log(data.length);
	return output;
}
function getBitLength() {
	let length = 0;
	for (let i in bitmap) {
		length += bitmap[i];
	}
	length = Math.ceil(length / 16);
	return length;
}
function decodeQRCode(message) {
	let length = getBitLength();
	let output = [];
	let m = message.slice(1);
	for (let i = 0; i < message.charCodeAt(0); i++) {
		output.push(decodeBuffer(m.slice(0, length)));
		m = m.slice(length);
	}
	return output;
}
function decodeBuffer(str) {
	console.log(bitmap);
	let length = getBitLength();
	// Get the array of 1s and zeros
	let arr = new Uint16Array(str.length);
	for (let i in str) {
		arr[i] = str.charCodeAt(i);
	}
	let buffer = [];
	for (let i in arr) {
		buffer.push(arr[i].toString(2).padStart(16, '0'));
	}

	buffer = buffer.join("");
	let values = {};
	let idx = 0;
	for (let i in bitmap) {
		console.log(i);
		if (!i) continue;

		let d = parseInt(buffer.slice(idx, idx + bitmap[i]), 2);
		idx += bitmap[i];
		values[i] = d;
	}

	let output = {};

	// The object is all numbers, so it should turn it back into usable values
	for (let i in dataMap.dmap.form) {
		for (let j in dataMap.dmap.form[i].rows) {
			let components = [];
			if (Array.isArray(dataMap.dmap.form[i].rows[j])) components = dataMap.dmap.form[i].rows[j];
			else components = [dataMap.dmap.form[i].rows[j]];
			for (let c of components) {
				switch (c.type) {
					case "picker":
					case "toggle":
						output[c.id] = c.options[values[c.id]];
						break;
					case "text":
					case "header":
						break;
					default:
						output[c.id] = values[c.id];
						break;
				}
			}
		}
	}
	output.teamNumber = values.teamNumber;
	output.matchNumber = values.matchNumber;
	return output;
}

//Braindead decoder that assumes fully valid input
function decodeUTF16LE(binaryStr) {
	var cp = [];
	for (var i = 0; i < binaryStr.length; i += 2) {
		cp.push(
			binaryStr.charCodeAt(i) |
			(binaryStr.charCodeAt(i + 1) << 8)
		);
	}

	return String.fromCharCode.apply(String, cp);
}

let started = false;
let games = "";
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
	//console.log(content);
	if (started) addContent(decodeUTF16LE(atob(content)));
});
Instascan.Camera.getCameras().then(function (cameras) {
	if (cameras.length > 0) {
		scanner.start(cameras[0]);
	} else {
		console.error('No cameras found.');
	}
}).catch(function (e) {
	console.error(e);
});
let matchNumber = -1;
let totalQRCodes = 0;
function addContent(content) {
	console.log(content, content.length);
	let qrCodeNumber = content.charCodeAt(0);
	if (qrCodeNumber >= (1 << 8)) {
		matchNumber = 1;
		totalQRCodes = qrCodeNumber >> 8;
	}
	else {
		if (qrCodeNumber - matchNumber != 0) {
			updateMessage("Show QR code number " + matchNumber + 2 + ' / ' + totalQRCodes);
			console.log(qrCodeNumber, matchNumber);
			return;
		}
		matchNumber = qrCodeNumber + 1;
	}
	games += content.slice(1);

	if (matchNumber == totalQRCodes) {
		done();
	}
	updateMessage();
}
let messageBox = document.getElementById('message-box');
function updateMessage(message) {
	if (message) {
		messageBox.innerHTML = message;
		return;
	}
	message = "";
	if (totalQRCodes == 0 && started) {
		message = "Show the first QR code";
	}
	else if (matchNumber > totalQRCodes && started) {
		message = "ERROR. Talk to Alex";
	}
	else if (matchNumber == totalQRCodes && started) {
		message = "Done reading QR Codes.";
	}
	else if (totalQRCodes > 0 && started) {
		message = `QR Codes ${matchNumber} / ${totalQRCodes} read. Ready for next QR code.`;
	}
	else {
		message = "Press start to begin";
	}
	messageBox.innerHTML = message;
}
updateMessage();
function start() {
	started = true;
	console.log('start');
	updateMessage();
}
let allMatches = [];
function done() {
	matchNumber = -1;
	started = false;
	console.log('done');
	if (totalQRCodes == 0) {
		updateMessage("No QR code given.");
		return;
	}
	totalQRCodes = 0;
	console.log(decodeQRCode(games));
	let matches = decodeQRCode(games)
	// Check if match is already entered
	for (let i = 0; i < matches.length; i++) {
		let entered = false;
		for (let j = 0; j < allMatches.length; j++) {
			if (allMatches[j].matchNumber == matches[i].matchNumber && allMatches[j].teamNumber == matches[i].teamNumber) {
				entered = true;
				break;
			}
		}
		if (!entered) {
			allMatches.push(matches[i]);
		}
	}
	games = "";
	updateMessage("Done. Press start to begin");

	save();
}

document.onkeyup = function (e) {
	if (e.key == ' ') start();
	else if (e.key == 'Escape') done();
}

function save() {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8080/submit", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(allMatches));
}
function getAllmatches() {

}