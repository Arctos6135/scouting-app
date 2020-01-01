function generateBuffer(data, bitmaps, formType, forms) {
	//console.log(data);
	const bitmap = bitmaps[formType];
	let length = 0;
	let buffer = [...forms[formType].id.toString(2).padStart(formTypeBits, '0')];

	for (let i in bitmap) {
		if (!i) continue;
		buffer.push(...(Math.round(data[i] || 0).toString(2).padStart(bitmap[i], '0')));
		//console.log((Math.round(data[i] || 0).toString(2).padStart(bitmap[i], '0')), i, data[i]);
	}
	while (buffer.length % 16 != 0) buffer.push(0);
	// Generate the string from that
	let arr = new Uint16Array(Math.ceil(buffer.length / 16));
	for (let i = 0; i < buffer.length; i++) {
		let idx = Math.floor(i / 16);
		arr[idx] <<= 1;
		arr[idx] += parseInt(buffer[i]);
	}
	console.log(buffer);
	let output = "";
	for (let c of arr) output += String.fromCharCode(c);
	return output;
}
function generateQRCode(allData, bitmaps, forms) {
	let data = [];
	for (let i in allData) {
		if (!allData[i].deleted) data.push(allData[i]);
	}
	let output = String.fromCharCode(data.length);
	for (let i in data) {
		output += generateBuffer(data[i], bitmaps, data[i].formType, forms);
	}
	console.log(output);
	return output;
}
function getBitLength(bitmap) {
	let length = 0;
	for (let i in bitmap) {
		length += bitmap[i];
	}
	return Math.ceil((length + 4) / 16) * 16 - 4;
}

function getFormNameFromID(formID, forms) {
	let name;

	for (let i in forms) {
		if (formID == forms[i].id) {
			name = i;
			console.log(i, formID);
			break;
		}
	}
	if (!name) throw new Error("Form type " + formID + " doesn't exist")
	return name
}

function decodeQRCode(message, bitmaps, forms) {
	let output = [];
	let m = message.slice(1);
	// Get the array of 1s and zeros
	let arr = new Uint16Array(m.length);
	for (let i in m) {
		arr[i] = m.charCodeAt(i);
	}
	let buffer = [];
	for (let i in arr) {
		buffer.push(arr[i].toString(2).padStart(16, '0'));
	}
	buffer = buffer.join("");
	console.log(buffer.length);
	for (let i = 0; i < message.charCodeAt(0); i++) {
		console.log(buffer.slice(0, formTypeBits));
		let name = getFormNameFromID(parseInt(buffer.slice(0, formTypeBits), 2), forms)
		buffer = buffer.slice(formTypeBits);

		let length = getBitLength(bitmaps[name]);
		output.push(decodeBuffer(buffer.slice(0, length), bitmaps[name], forms[name].form));
		buffer = buffer.slice(length);
	}
	return output;
}
function decodeBuffer(buffer, bitmap, form) {
	let values = {};
	let idx = 0;
	for (let i in bitmap) {
		if (!i) continue;

		let d = parseInt(buffer.slice(idx, idx + bitmap[i]), 2);
		idx += bitmap[i];
		values[i] = d;
	}

	let output = {};

	// The object is all numbers, so it should turn it back into usable values
	for (let i in form) {
		for (let j in form[i].rows) {
			let components = [];
			if (Array.isArray(form[i].rows[j])) components = form[i].rows[j];
			else components = [form[i].rows[j]];
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
	console.log(decodeQRCode(games, bitmaps, forms));
	let matches = decodeQRCode(games, bitmaps, forms)
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