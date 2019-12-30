import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles'
import * as inputs from './inputs.js'

export const popupStyles = {
	mainPopup: {
		...styles.shadow,
		flex: 1,
		flexDirection: "column",
		...styles.align.center,
		width: "100%",
		height: "75%",
		backgroundColor: "#ffffff",
		zIndex: 100,
		elevation: 10,
		justifyContent: "space-between",
		padding: 10,
		alignItems: "stretch"
	},
	header: {
		container: {
			...styles.align.center,
			flex: 0.5
		},
		text: {
			...styles.font.header
		}
	},
	controlBar: {
		flex: 0.5,
		flexDirection: 'row',
		width: '100%',
		justifyContent: "space-between",
		alignItems: "flex-end"
	},
	inputs: {
		flex: 3,
		flexDirection: 'column',
		width: '100%',
		padding: 25,
		justifyContent: "center"
	},
	button: {
		flex: 1,
		fontSize: 16,
		...styles.font.standardText,
		...styles.align.bottom,
		width: "100%",
		height: "100%",
		flexDirection: "row",
		margin: 10,
		zIndex: 100000
	},
	buttonText: {
		flex: 1,
		...styles.font.navButton,
		...styles.align.center,
		color: styles.colors.highlight.bg
	},
	numberInput: {
		marginVertical: "10%"
	}
}

import { NetInfo } from 'react-native';


export class AddMatchPopup extends React.Component {
	state = {
		teamNumber: 0,
		matchNumber: 0
	}
	render() {
		let disabled = !(this.state.teamNumber && this.state.matchNumber);
		return (
			<View style={popupStyles.mainPopup}>
				{/* Create a new match */}
				<View style={popupStyles.header.container}>
					<Text style={popupStyles.header.text}>
						Create a new match
					</Text>
				</View>
				{/* Actual data entry */}
				<View style={popupStyles.inputs}>
					{/* Match number */}
					<inputs.LabeledInput textStyle={styles.font.inputHeader} style={popupStyles.numberInput} label="Enter a match number">
						<inputs.NumberInput allowEmpty onValueChange={(newMatchNumber) => this.setState({ matchNumber: newMatchNumber })}></inputs.NumberInput>
					</inputs.LabeledInput>
					{/* Team number */}
					<inputs.LabeledInput textStyle={styles.font.inputHeader} style={popupStyles.numberInput} label="Enter a team number">
						<inputs.NumberInput allowEmpty onValueChange={(newTeamNumber)=>this.setState({teamNumber: newTeamNumber})}></inputs.NumberInput>
					</inputs.LabeledInput>
				</View>
				{/* Submit and cancel buttons */}
				<View style={popupStyles.controlBar}>
					{/* Cancel button */}
					<TouchableOpacity
						onPress={this.props.onCancel}
						style={popupStyles.button}
					><Text
							style={popupStyles.buttonText}>
							Cancel
						</Text>
					</TouchableOpacity>


					{/* Submit button */}
					<TouchableOpacity
						disabled={disabled}
						onPress={() => this.props.onSubmit(this.state.teamNumber, this.state.matchNumber)}
						style={popupStyles.button}
					><Text
							style={[{ ...popupStyles.buttonText, fontWeight: "bold" }, disabled ? { color: "#e0e0e0" } : null]}>
							Submit
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}


export class SetupPopup extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			wifiMode: props.wifiMode,
			connected: false,
			log: "Checking for internet connection\n"
		}
		NetInfo.getConnectionInfo().then(state => {
			console.log(state);
			if (state.type != 'none') {
				this.setState({ log: this.state.log + 'Connected\n', connected: true });
			}
			else {
				this.setState({ log: this.state.log + 'Failed to connect\n', connected: false });
			}
		})
	}
	render() {
		return (
			<View style={popupStyles.mainPopup}>
				{/* Create a new match */}
				<View style={popupStyles.header.container}>
					<Text style={popupStyles.header.text}>
						Setup
					</Text>
				</View>
				{/* Actual data entry */}
				<View style={popupStyles.inputs}>
					<TouchableOpacity onPress={this.props.onAddMatch} style={[{
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: styles.colors.secondary.bg,
						margin: 5,
						paddingVertical: 15,
						...styles.shadow

					}, !this.state.connected ? { elevation: 0, backgroundColor: styles.colors.tertiary.bg } : undefined]}
						disabled={!this.state.connected}>
						<Text style={{ color: styles.colors.secondary.text, ...styles.font.standardText }}>
							Update Data Map
						</Text>
					</TouchableOpacity>

					{/* Use wifi */}
					<inputs.LabeledInput textStyle={styles.font.inputHeader} style={popupStyles.numberInput} label="Wifi mode (experimental)">
						<inputs.ToggleInput value={this.state.wifiMode} onValueChange={(useWifi) => this.setState({ wifiMode: useWifi })}></inputs.ToggleInput>
					</inputs.LabeledInput>
				</View>
				<View style={{flexGrow: 2, alignItems: "flex-start", justifyContent: "flex-start", paddingHorizontal:25}}>
					<Text>
						{this.state.log}
					</Text>
				</View>
				{/* Submit and cancel buttons */}
				<View style={popupStyles.controlBar}>
					{/* Cancel button */}
					<TouchableOpacity
						onPress={this.props.onCancel}
						style={popupStyles.button}
					><Text
						style={popupStyles.buttonText}>
							Cancel
						</Text>
					</TouchableOpacity>


					{/* Submit button */}
					<TouchableOpacity
						onPress={() => this.props.onSubmit(this.state.wifiMode)}
						style={popupStyles.button}
					><Text
						style={[{ ...popupStyles.buttonText, fontWeight: "bold" }]}>
							Submit
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
