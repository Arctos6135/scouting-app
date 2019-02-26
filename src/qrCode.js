import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Button } from 'react-native';
import styles from './styles'
import QRCode from 'react-native-qrcode';
import * as dataMap from './dataMap'
import pako from 'pako'

function generateBuffer(data) {
	console.log(data);
	let length = 0;
	for (let i in dataMap.bitmap) {
		length += dataMap.bitmap[i].bits * dataMap.bitmap[i].amount;
	}
	let buffer = [];
	// Create an array of bits for each match in the qr code
	//for (let i in data) {
		for (let prop in dataMap.bitmap) {
			for (let name in dataMap.dataNames[prop]) {
				let type = dataMap.bitmap[prop];
				let value;
				//console.log(prop, JSON.stringify(dataMap.dataTypes[prop]), data[dataMap.dataNames[prop][name]], dataMap.dataNames[prop][name])
				if (dataMap.dataTypes[prop] == "number") {
					value = parseInt(data[dataMap.dataNames[prop][name]]);
				}
				else {
					let propName = dataMap.dataNames[prop][name];
					let userValue = data[propName];
					if (typeof userValue == "boolean") userValue = Number(userValue);
					value = parseInt(dataMap.dataTypes[prop][userValue]);
					//if (!(value > 0)) console.log(dataMap.dataTypes[prop][userValue])
				}
				buffer.push(...(value.toString(2).slice(-type.bits).padStart(type.bits, '0')))
				//console.log(dataMap.dataNames[prop][name], value.toString(2), value.toString(2).slice(-type.bits).padStart(type.bits, '0'));
			}
		}
	//}
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
function generateQRCode(data) {
	let output = String.fromCharCode(data.length);
	for (let i in data) {
		output += generateBuffer(data[i]);
	}
	let deflated = pako.deflate(output, { to: "string" });
	console.log(deflated.length, output.length);
	return deflated;
}
function decodeQRCode(message) {
	message = pako.inflate(message, { to: "string" });
	let length = 0;
	for (let i in dataMap.bitmap) {
		length += dataMap.bitmap[i].bits * dataMap.bitmap[i].amount;
	}
	length = Math.ceil(length / 16);
	let output = [];
	let m = message.slice(1);
	for (let i = 0; i < message.charCodeAt(0); i++) {
		output.push(decodeBuffer(m.slice(0, length)));
		m = m.slice(0, length);
	}
	return output;
}
function decodeBuffer(str) {
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
		buffer.push(...temp);
	}
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

const qrCodeBytes = 60;
export default class QRCodeGenerator extends React.Component {
	render() {
		let codes = [];
		let matches = generateQRCode(this.props.data);
		
		let rawCodes = [];
		let idx = 0;
		for (let i = 0; i < matches.length; i++) {
			rawCodes[idx] = "";
			for (let j = 0; j < qrCodeBytes / 2 && i < matches.length; j++ , i++) {
				rawCodes[idx] += matches[i];
			}
			codes.push(
				<QRCode
					size={Dimensions.get("window").width - 50}
					value={rawCodes[idx]}
				></QRCode>
			)
			idx++;
		}

		return <View>
			<QRCodeViewer codes={codes}></QRCodeViewer>
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
				<View style={{ height: 50 }}></View>
		</View>) : null}
		</View>
		);
				
	}
}