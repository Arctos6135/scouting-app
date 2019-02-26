
const dataNames = {
	cargo: ["cargo1", "cargo2", "cargo3", "cargo4"],
	hatch: ["hatch1", "hatch2", "hatch3", "hatch4"],
	rocketCargo: ["rock1c", "rock2c", "rock3c", "rock4c"],
	rocketHatch: ["rock1h", "rock2h", "rock3h", "rock4h"],
	climbing: {
		levelReached: "climblvlReached",
		assist: "assist"
	},
	attributes: {
		broken: "broken",
		tip: "tip",
		cargoFromDepot: "depot",
		hatchesFromFloor: "floor"
	},
	gameInfo: {
		opposingSideTime: "opposide",
		penaltyPoints: "ppoints",
		hatchesDropped: "hdropped"
	},
	matchInfo: {
		matchNumber: "matchNumber",
		teamNumber: "teamNumber"
	}
}

const climbOptions = [
	"No climb",
	"Level 1",
	"Level 2",
	"Level 3"
]
const defaultClimbOption = 0;

const assistOptions = [
	"No assist",
	"Level 2",
	"Level 3"
]
const defaultAssistOption = 0;

const gamePieceOptions = [
	"None",
	"Rocket 1",
	"Rocket 2",
	"Rocket 3",
	"Rocket 4"
]
const defaultGamePieceOption = 0;

function swap(json) {
	let ret = {};
	for (let key in json) {
		ret[json[key]] = key;
	}
	return ret;
}
const dataTypes = {
	"cargo": swap(gamePieceOptions),
	"hatch": swap(gamePieceOptions),
	"rocketCargo": [0, 1, 2, 3],
	"rocketHatch": [0, 1, 2, 3],
	"climbing": { ...swap(climbOptions), "No assist": 0 },
	"attributes": [0, 1],
	"gameInfo": "number",
	"matchInfo": "number"
}

const bitmap = {
	"cargo": {
		bits: 3,
		amount: 4
	},
	"hatch": {
		bits: 3,
		amount: 4
	},
	"rocketCargo": {
		bits: 2,
		amount: 4
	},
	"rocketHatch": {
		bits: 2,
		amount: 4
	},
	"climbing": {
		bits: 2,
		amount: 2
	},
	"attributes": {
		bits: 1,
		amount: 4
	},
	"gameInfo": {
		bits: 8,
		amount: 3
	},
	"matchInfo": {
		bits: 16,
		amount: 2
	}
}
const dataMap = {
	bitmap, dataNames, dataTypes
}

function getBitLength() {
	let length = 0;
	for (let i in dataMap.bitmap) {
		length += dataMap.bitmap[i].bits * dataMap.bitmap[i].amount;
	}
	length = Math.ceil(length / 16);
	return length;
}
function decodeQRCode(message) {
	let length = getBitLength();
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
			temp = temp.slice(16 * (length / 16 - Math.floor(length / 16)) + 1)
		}

		buffer.push(...temp);
	}

	console.log(buffer.join(""));

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
	console.log(content);
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
let matchNumber = 1;
let totalMatches = 0;
function addContent(content) {
	console.log(content);
	let qrCodeNumber = content.charCodeAt(0);
	if (qrCodeNumber >= (1 << 8)) {
		matchNumber = 1;
		totalMatches = qrCodeNumber >> 8;
	}
	else {
		if (qrCodeNumber - matchNumber - 1 != 1) {
			updateMessage("You skipped a QR Code. Go back one.");
			console.log(qrCodeNumber, matchNumber);
			return;
		}
		matchNumber = qrCodeNumber + 1;
	}
	games += content.slice(1);

	if (matchNumber == totalMatches) {
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
	if (totalMatches == 0 && started) {
		message = "Show the first QR code";
	}
	else if (matchNumber > totalMatches && started) {
		message = "ERROR. Talk to Alex";
	}
	else if (matchNumber == totalMatches && started) {
		message = "Done reading QR Codes.";
	}
	else if (totalMatches > 0 && started) {
		message = `QR Codes ${matchNumber} / ${totalMatches} read. Ready for next QR code.`;
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
	started = false;
	console.log('done');
	if (totalMatches == 0) {
		updateMessage("No QR code given");
		return;
	}
	totalMatches == 0;
	console.log(decodeQRCode(games));
	allMatches.push(decodeQRCode(games));
	games = "";
	updateMessage("Done. Press start to begin");
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