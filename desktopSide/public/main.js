

function getBitLength() {
	let length = 0;
	for (let i in dataMap.bitmap) {
		length += dataMap.bitmap[i].bits * dataMap.bitmap[i].amount;
	}
	return length;
}
function decodeQRCode(message) {
	let length = Math.ceil(getBitLength() / 16);
	console.log(message.length);
	let output = [];
	let m = message.slice(1);
	console.log(message.charCodeAt(0));
	for (let i = 0; i < message.charCodeAt(0); i++) {
		output.push(decodeBuffer(m.slice(0, length)));
		m = m.slice(length);
	}
	return output;
}
function decodeBuffer(str) {
	let length = getBitLength();
	// Get the array of 1s and zeros
	let arr = new Uint16Array(str.length);
	for (let i in str) {
		arr[i] = str.charCodeAt(i);
	}
	let buffer = [];
	for (let i in arr) {
		let temp = [];
		for (let j = 0; j < 16; j++) {
			temp.push(arr[i] & 1);
			arr[i] >>= 1;
		}
		temp.reverse();

		if (i == arr.length - 1) {
			temp = temp.slice(buffer.length + temp.length - length);
		}

		buffer.push(...temp);
	}

	//console.log(buffer.join(""));

	let values = {};
	let idx = 0;
	for (let map in dataMap.bitmap) {
		for (let j in dataMap.dataNames[map]) {
			let bits = "";
			for (let i = 0; i < dataMap.bitmap[map].bits; i++) {
				bits += buffer[idx].toString();
				idx++;
			}
			values[dataMap.dataNames[map][j]] = parseInt(bits, 2);

		}
	}

	// The object is all numbers, so it should turn it back into usable values
	for (let i in dataMap.bitmap) {
		if (dataMap.bitmap[i].bits == 1) {
			for (let j in dataMap.dataNames[i]) {
				values[dataMap.dataNames[i][j]] = !!values[dataMap.dataNames[i][j]];
			}
		}
	}
	return values;
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