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
		textAlign: "left",
		color: styles.colors.highlight.bg
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
	(<View style={[{
		width: "100%",
		paddingBottom: 10,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row"
	}, props.style]}>{props.children}
	</View>);
const Spacer = (props) => (<View style={{ flex: 0.1 }}></View>);

const dataNames = {
	cargo: ["cargo1", "cargo2", "cargo3", "cargo4"],
	hatch: ["hatch1", "hatch2", "hatch3", "hatch4"],
	rocketCargo: ["rock1c", "rock2c", "rock3c", "rock4c"],
	rocketHatch: ["rock1h", "rock2h", "rock3h", "rock4h"],
	climbing: {
		levelReached: "climblvlReached",
		assist: "assist"
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

		for (let i in dataNames.rocket) {
			if (!newData[dataNames.rocket[i]]) newData[dataNames.rocket[i]] = 0;
		}

		if (!newData[dataNames.climbing.levelReached]) newData[dataNames.climbing.levelReached] = climbOptions[defaultClimbOption];
		if (!newData[dataNames.climbing.assist]) newData[dataNames.climbing.assist] = assistOptions[defaultAssistOption];


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
		console.log(this.props.data);
		let sandstormRockets = [];
		for (let i = 0; i < dataNames.cargo.length; i++) {
			sandstormRockets.push(<Row key={i}>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Hatch " + (i + 1)} style={dataEntryStyles.gamePieceInput}>
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

				<inputs.LabeledInput textStyle={styles.font.dataEntry}  label={"Cargo " + (i + 1)} style={dataEntryStyles.gamePieceInput}>
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

		let teleopRockets = [];
		let key = 0;
		for (let i = 0; i < dataNames.rocketCargo.length; i++) {
			teleopRockets.push(<Row key={key++}>
				<Text style={[styles.font.subHeader]}>Rocket {(i + 1).toString()}</Text>
			</Row>)
			teleopRockets.push(<Row style={{paddingBottom: 5}} key={key++}>
				<inputs.LabeledInput textStyle={styles.font.dataEntry}  label={"Cargo"} style={dataEntryStyles.gamePieceInput}>
					<inputs.SliderInput step={1} minimumValue={0} maximumValue={3} value={this.props.data[dataNames.rocketCargo[i]]} options={gamePieceOptions}
						onValueChange={(value) => this.dataUpdated(value, dataNames.rocketCargo[i])}
					></inputs.SliderInput>
				</inputs.LabeledInput>
			</Row>);

			teleopRockets.push(<Row style={{ paddingBottom: 5 }} key={key++}>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Hatch"} style={dataEntryStyles.gamePieceInput}>
					<inputs.SliderInput step={1} minimumValue={0} maximumValue={3} value={this.props.data[dataNames.rocketHatch[i]]} options={gamePieceOptions}
						onValueChange={(value) => this.dataUpdated(value, dataNames.rocketHatch[i])}
					></inputs.SliderInput>
				</inputs.LabeledInput>
			</Row>);
		}

		let climbing = (
			<Row>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Level reached"} style={dataEntryStyles.gamePieceInput}>
					<inputs.PickerInput value={this.props.data[dataNames.climbing.levelReached]} options={climbOptions}
						onValueChange={(selected) => this.dataUpdated(selected, dataNames.climbing.levelReached)}
						style={{
							backgroundColor:
								this.props.data[dataNames.climbing.levelReached] == climbOptions[defaultClimbOption] ?
									styles.colors.tertiary.bg : styles.colors.secondary.bg
						}}
					></inputs.PickerInput>
				</inputs.LabeledInput>

				<Spacer></Spacer>

				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Assist"} style={dataEntryStyles.gamePieceInput}>
					<inputs.PickerInput value={this.props.data[dataNames.climbing.assist]} options={assistOptions}
						onValueChange={(selected) => this.dataUpdated(selected, dataNames.climbing.assist)}
						style={{
							backgroundColor:
								this.props.data[dataNames.climbing.assist] == assistOptions[defaultAssistOption] ?
									styles.colors.tertiary.bg : styles.colors.secondary.bg
						}}
					></inputs.PickerInput>
				</inputs.LabeledInput>
			</Row>
		)
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
					<MatchList matches={[this.props.data]}></MatchList>
				</Row>
				<View style={{ height: 30 }}></View>
				{/* Sandstorm phase */}
				<Row>
					<Text style={dataEntryStyles.header}>
						Sandstorm
					</Text>
				</Row>
				{sandstormRockets}

				<Row style={{paddingTop: 20}}>
					<Text style={dataEntryStyles.header}>
						Tele-op
					</Text>
				</Row>
				{teleopRockets}

				<Row style={{ paddingTop: 20 }}>
					<Text style={dataEntryStyles.header}>
						Climbing
					</Text>
				</Row>
				{climbing}

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