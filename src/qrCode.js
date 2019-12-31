import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Button, CheckBox } from 'react-native';
import styles from './styles'
import QRCode from 'react-native-qrcode-svg';
import * as dataMap from './dataMap'
import { Buffer } from 'buffer';
import { DataMap } from './dataEntry'

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

const qrCodeBytes = 100;
export default class QRCodeGenerator extends React.Component {
	render() {
		bitmap = getBitSizes(dataMap.dmap.form);
		let codes = [];
		let matches = generateQRCode(this.props.data);
		console.log('generated', matches);
		console.log(decodeQRCode(matches));
		console.log('decoded');
		let rawCodes = [];
		let idx = 0;
		for (let i = 0; i < matches.length; i += (qrCodeBytes / 2 - 1)) {
			rawCodes[idx] = "";
			if (idx == 0) rawCodes[idx] += String.fromCharCode(Math.ceil((matches.length / qrCodeBytes) * 2) << 8);
			else rawCodes[idx] += String.fromCharCode(idx);
			console.log(rawCodes[idx].charCodeAt(0));
			rawCodes[idx] += matches.slice(i, i + (qrCodeBytes / 2 - 1));
			console.log(rawCodes[idx], Buffer(rawCodes[idx], 'utf16le').toString('base64'));
			codes.push(
				<QRCode
					size={Dimensions.get("window").width - 100}
					value={Buffer(rawCodes[idx], 'utf16le').toString('base64')}
				/>
			)
			idx++;
		}
		console.log(codes);

		return <View>
			<QRCodeViewer codes={codes}></QRCodeViewer>
			<View style={{ height: 50 }}></View>
			<Button onPress={() => this.props.return()} title={"Back"}></Button>
		</View>
	}
}

class QRCodeViewer extends React.Component {
	state = {
		codeIndex: 0
	}
	render() {
		return (<View>
			{this.props.codes[this.state.codeIndex]}
			{this.props.codes.length > 1 ? (<View>
				<View style={{ height: 50 }}></View>
				<View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
					<TouchableOpacity style={{ flex: 1, minWidth: 100 }} onPress={() => this.setState({ codeIndex: this.state.codeIndex - 1 })} disabled={this.state.codeIndex <= 0}>
						<Text style={{ ...styles.font.navButton }}>Previous</Text>
					</TouchableOpacity>
					<View style={{ flex: 5, ...styles.align.center }}>
						<Text style={{ ...styles.align.center, ...styles.font.subHeader }}>
							{(1 + this.state.codeIndex).toString()} / {this.props.codes.length.toString()}
						</Text>
					</View>
					<TouchableOpacity style={{ flex: 1, minWidth: 100 }} onPress={() => this.setState({ codeIndex: this.state.codeIndex + 1 })} disabled={this.state.codeIndex >= this.props.codes.length - 1}>
						<Text style={{ ...styles.font.navButton, textAlign: "right" }}>Next</Text>
					</TouchableOpacity>
				</View>
			</View>) : null}
		</View>
		);

	}
}