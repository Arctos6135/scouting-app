import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles'
import * as inputs from './inputs'
import MatchList from './listMatches'
import { addMatchStyles } from './addMatch'

const dataEntryStyles = {
	header: {
		//...styles.align.center,
		//textAlign: "center",
		...styles.font.header,
		flex: 1
	},
	gamePieceInput: {
		flex: 1
	},
	navigationButton: {
		fontSize: 16,
		...styles.font.standardText,
		height: "100%",
		flexDirection: "row",
		zIndex: 100000,
		flex: 1
	},
	buttonText: {
		...styles.font.standardText,
		width: "100%",
		textAlign: "left"
	},
	controlBarButton: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: styles.colors.dangerous.bg,
		width: "100%",
		margin: 5
	}
}

const Row = (props) =>
	(<View style={{
		...props.style,
		width: "100%",
		paddingBottom: 20,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row"
	}}>{props.children}
	</View>);
const Spacer = (props) => (<View style={{ flex: 0.1 }}></View>);

const dataNames = {
	cargo: ["cargo1", "cargo2", "cargo3", "cargo4"],
	hatch: ["hatch1", "hatch2", "hatch3", "hatch4"]
}

const gamePieceOptions = [
	"None",
	"Rocket 1",
	"Rocket 2",
	"Rocket 3",
	"Rocket 4"
]
const defaultGamePieceOption = 0;

export default class DataEntry extends React.Component {
	constructor(props) {
		super(props);
		let newData = {
			...this.props.data
		}

		for (let i = 0; i < dataNames.cargo.length; i++) {
			if (!newData[dataNames.cargo[i]]) newData[dataNames.cargo[i]] = gamePieceOptions[defaultGamePieceOption];
			if (!newData[dataNames.hatch[i]]) newData[dataNames.hatch[i]] = gamePieceOptions[defaultGamePieceOption];
		}
		this.props.onDataChange(newData);
		this.originalValue = this.props.data;
	}
	dataUpdated(data, property) {
		let newData = {
			...this.props.data
		};
		newData[property] = data;
		this.props.onDataChange(newData);
	}
	onCancel() {
		this.props.onDataChange(this.originalValue);
		this.props.return();
	}
	onDone() {
		this.props.return();
	}
	delete() {
		this.props.delete();
		this.props.return();
	}
	render() {
		let rockets = [];
		for (let i = 0; i < dataNames.cargo.length; i++) {
			rockets.push(<Row key={i}>
				<inputs.LabeledInput label={"Hatch " + (i + 1)} style={dataEntryStyles.gamePieceInput}>
					<inputs.PickerInput value={this.props.data[dataNames.hatch[i]]} options={gamePieceOptions}
						onValueChange={(selected) => this.dataUpdated(selected, dataNames.hatch[i])}
						style={{
							backgroundColor:
								this.props.data[dataNames.hatch[i]] == gamePieceOptions[defaultGamePieceOption] ?
									styles.colors.tertiary.bg : styles.colors.secondary.bg
						}}
					></inputs.PickerInput>
				</inputs.LabeledInput>

				<Spacer></Spacer>

				<inputs.LabeledInput label={"Cargo " + (i + 1)} style={dataEntryStyles.gamePieceInput}>
					<inputs.PickerInput value={this.props.data[dataNames.cargo[i]]} options={gamePieceOptions}
						onValueChange={(selected) => this.dataUpdated(selected, dataNames.cargo[i])}
						style={{
							backgroundColor:
								this.props.data[dataNames.cargo[i]] == gamePieceOptions[defaultGamePieceOption] ?
									styles.colors.tertiary.bg : styles.colors.secondary.bg
						}}
					></inputs.PickerInput>
				</inputs.LabeledInput>
			</Row>)
		}
		return (<View style={{ width: "100%", flex: 1, flexDirection:"column" }}>
			{/* Submit and cancel buttons */}
			<Row>
				{/* Cancel button */}
				<TouchableOpacity
					onPress={() => this.onCancel()}
					style={dataEntryStyles.navigationButton}
				>
					<Text style={dataEntryStyles.buttonText}>
						Cancel
					</Text>
				</TouchableOpacity>


				{/* Submit button */}
				<TouchableOpacity
					onPress={() => this.onDone()}
					style={dataEntryStyles.navigationButton}
				>
					<Text style={{ ...dataEntryStyles.buttonText, fontWeight: "bold", textAlign: "right" }}>
						Done
					</Text>
				</TouchableOpacity>
			</Row>
			<View style={{ height: 30 }}></View>
			<ScrollView>
				<Row>
					<MatchList matches={[this.props.data]} touchable={true}></MatchList>
				</Row>
				<View style={{ height: 30 }}></View>
				{/* Sandstorm phase */}
				<Row>
					<Text style={dataEntryStyles.header}>
						Sandstorm
					</Text>
				</Row>
				{rockets}
				<View style={{ height: 50 }}></View>
				<Row>
					<TouchableOpacity onPress={() => { this.delete() }} style={dataEntryStyles.controlBarButton}>
						<Text style={{ color: styles.colors.dangerous.text, ...styles.font.standardText }}>
							Delete Match
						</Text>
					</TouchableOpacity>
				</Row>
			</ScrollView>
		</View>)
	}
}