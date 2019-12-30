import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './styles'
import * as inputs from './inputs'
import MatchList from './listMatches'
import { popupStyles } from './popups'
import { startLevelOptions, dataNames, dataTypes, assistOptions, gamePieceOptions, climbOptions, defaultAssistOption, defaultClimbOption, defaultGamePieceOption } from './dataMap'

const dmap = [
	{
		title: "Sandstorm",
		rows: [
			{
				title: "Start Level",
				type: "picker",
				options: ["Didn't cross baseline", "Level 1", "Level 2"],
				id: 'ssl'
			},
			[
				{
					title: "Hatch 1",
					type: "picker",
					options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", , "Cargo Ship"],
					id: 'sh1'
				},
				{
					title: "Cargo 1",
					type: "picker",
					options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", , "Cargo Ship"],
					id: 'sc1'
				}
			],
			[
				{
					title: "Hatch 2",
					type: "picker",
					options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", , "Cargo Ship"],
					id: 'sh2'
				},
				{
					title: "Cargo 2",
					type: "picker",
					options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", , "Cargo Ship"],
					id: 'sc2'
				}
			],
			[
				{
					title: "Hatch 3",
					type: "picker",
					options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", , "Cargo Ship"],
					id: 'sh3'
				},
				{
					title: "Cargo 3",
					type: "picker",
					options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", , "Cargo Ship"],
					id: 'sc3'
				}
			],
			[
				{
					title: "Hatch 4",
					type: "picker",
					options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", , "Cargo Ship"],
					id: 'sh4'
				},
				{
					title: "Cargo 4",
					type: "picker",
					options: ["None", "Rocket Level 1", "Rocket Level 2", "Rocket Level 3", , "Cargo Ship"],
					id: 'sc4'
				}
			]
		]
	},
	{
		title: "Tele-op",
		rows: [
			{
				title: "Rocket 1", 
				type: "text"
			},
			{
				title: "Cargo",
				type: "slider",
				range: [0, 4],
				increment: 1,
				id: 'tc1'
			},
			{
				title: "Hatch",
				type: "slider",
				range: [0, 4],
				increment: 1,
				id: 'th1'
			},
			
			{
				title: "Rocket 2",
				type: "text"
			},
			{
				title: "Cargo",
				type: "slider",
				range: [0, 4],
				increment: 1,
				id: 'tc1'
			},
			{
				title: "Hatch",
				type: "slider",
				range: [0, 4],
				increment: 1,
				id: 'th1'
			},
			
			{
				title: "Rocket 3",
				type: "text"
			},
			{
				title: "Cargo",
				type: "slider",
				range: [0, 4],
				increment: 1,
				id: 'tc1'
			},
			{
				title: "Hatch",
				type: "slider",
				range: [0, 4],
				increment: 1,
				id: 'th1'
			},
			
			{
				title: "Cargo Ship",
				type: "text"
			},
			{
				title: "Cargo",
				type: "slider",
				range: [0, 8],
				increment: 1,
				id: 'tcc'
			},
			{
				title: "Hatch",
				type: "slider",
				range: [0, 8],
				increment: 1,
				id: 'thc'
			},
		]
	},
	{
		title: "Climbing",
		rows: [
			[
				{
					title: "Level Reached",
					type: "picker",
					options: ["No climb", "Level 1", "Level 2", "Level 3"],
					id: 'cl'
				},
				{
					title: "Assist",
					type: "picker",
					options: ["No assist", "Level 2", "Level 3"],
					id: 'ca'
				}
			]
		]
	},
	{
		title: "Attributes",
		rows: [
			{
				title: "Did the robot break?",
				type: "toggle",
				options: ["No", "Yes"],
				id: 'ab'
			},
			{
				title: "Did the robot tip?",
				type: "toggle",
				options: ["No", "Yes"],
				id: 'at'
			},
			{
				title: "Can it pick up hatches from the floor?",
				type: "toggle",
				options: ["No", "Yes"],
				id: 'af'
			},
			{
				title: "Time spent on opponents side of field",
				type: "timer",
				id: 'as'
			},
			{
				title: "Number of hatches dropped",
				type: "number",
				increments: [-1, 1],
				id: 'ah'
			},
		]
	}
]

const headingPadding = 50;

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
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: styles.colors.dangerous.bg,
		width: "100%",
		margin: 5
	}
}

class DataMap {
	constructor(data) {
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
			for (let r of data.rows) {
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
	}
	generateEntry() {
		let out = [];
		for (let i in this.components) out.push(DataMap.getRow(this.components[i]));
		return out;
	}
	static getComponent(component) {
		//TODO: Write code to generate components
	}
	static getRow(component) {
		let output;
		if (Array.isArray(component)) {
			let row = [];
			for (let c of component) {
				row.push(DataMap.getComponent(c));
				row.push(<Spacer></Spacer>)
			}
			row = row.slice(0, -1);
			output = (<Row>{row}</Row>)
		}
		else {
			output = (<Row>{DataMap.getComponent(component)}</Row>)
		}
		return output;
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

export default class DataEntry extends React.Component {
	
	Toggle = (props) => <Row style={{ marginBottom: 10 }}>
		<inputs.LabeledInput textStyle={styles.font.dataEntry} label={props.label} style={dataEntryStyles.gamePieceInput}>
			<inputs.ToggleInput
				onValueChange={(selected) =>
					this.dataUpdated(selected, props.variable)}
				activeText={props.active}
				inactiveText={props.inactive}
				value={this.props.data[props.variable]}></inputs.ToggleInput>
		</inputs.LabeledInput>
	</Row>

	Timer = (props) => <Row style={{ marginBottom: 10 }}>
		<inputs.LabeledInput textStyle={styles.font.dataEntry} label={props.label} style={dataEntryStyles.gamePieceInput}>
			<inputs.TimerInput
				onValueChange={(selected) =>
					this.dataUpdated(selected, props.variable)}
				value={this.props.data[props.variable]}></inputs.TimerInput>
		</inputs.LabeledInput>
	</Row>

	constructor(props) {
		super(props);
		this.state = {
			dead: false,
			dataMap: new DataMap(props.dataMap)
		}
		this.originalValue = props.data;
		if (props.data['#']) {
			let newData = {};
			for (let i of this.state.dataMap.variables) {
				newData[i] = 0;
			}
			this.props.onDataChange(newData);
			this.originalValue = newData;
		}
	}

	render() {
		if (this.state.dead) return <View></View>
	
		let dataEntry = this.state.dataMap.generateEntry();

		return (<View key={0} style={{ width: "100%", flex: 1, flexDirection: "column" }}>
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
					<MatchList editable matches={[this.props.data]}></MatchList>
				</Row>
				<View style={{ height: headingPadding }}></View>
				
				{dataEntry}

				<View style={{ height: 50 }}></View>
				<Row>
					<TouchableOpacity onPress={() => { this.runDeleteMessage() }} style={dataEntryStyles.controlBarButton}>
						<Text style={{ color: styles.colors.dangerous.text, ...styles.font.standardText }}>
							Delete Match
						</Text>
					</TouchableOpacity>
				</Row>
				<View style={{ height: 150 }}></View>
			</ScrollView>
		</View>)
	}

	delete() {
		this.setState({ dead: true });
		this.props.delete();
		this.props.return();
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
	runDeleteMessage() {
		const self = this;
		Alert.alert("Are you sure?",
			"Deleting a match cannot be undone.",
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: "Yes", onPress: () => {
						self.delete();
					}
				}
			],
			{ cancelable: true });
	}
		/*let newData = {
			...this.props.data
		}
		if (!newData[dataNames.startLevel[0]]) newData[dataNames.startLevel[0]] = startLevelOptions[0];

		for (let i = 0; i < dataNames.cargo.length; i++) {
			if (!newData[dataNames.cargo[i]]) newData[dataNames.cargo[i]] = gamePieceOptions[defaultGamePieceOption];
			if (!newData[dataNames.hatch[i]]) newData[dataNames.hatch[i]] = gamePieceOptions[defaultGamePieceOption];
		}

		for (let i in dataNames.rocketHatch) {
			if (!newData[dataNames.rocketHatch[i]]) newData[dataNames.rocketHatch[i]] = 0;
			if (!newData[dataNames.rocketCargo[i]]) newData[dataNames.rocketCargo[i]] = 0;
		}
		if (!newData[dataNames.shipCargo[0]]) newData[dataNames.shipCargo[0]] = 0;
		if (!newData[dataNames.shipHatch[0]]) newData[dataNames.shipHatch[0]] = 0;

		if (!newData[dataNames.climbing.levelReached]) newData[dataNames.climbing.levelReached] = climbOptions[defaultClimbOption];
		if (!newData[dataNames.climbing.assist]) newData[dataNames.climbing.assist] = assistOptions[defaultAssistOption];

		for (let attribute in dataNames.attributes) {
			if (!newData[dataNames.attributes[attribute]]) newData[dataNames.attributes[attribute]] = false;
		}

		for (let gameInfo in dataNames.gameInfo) {
			if (!newData[dataNames.gameInfo[gameInfo]]) newData[dataNames.gameInfo[gameInfo]] = 0;
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
	runDeleteMessage() {
		const self = this;
		Alert.alert("Are you sure?",
			"Deleting a match cannot be undone.",
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: "Yes", onPress: () => {
						self.delete();
					}
				}
			],
			{ cancelable: true });
	}
	delete() {
		this.setState({ dead: true });
		this.props.delete();
		this.props.return();
	}
	render() {
		if (this.state.dead) return <View></View>
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

				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Cargo " + (i + 1)} style={dataEntryStyles.gamePieceInput}>
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
			teleopRockets.push(<Row style={{ paddingBottom: 5 }} key={key++}>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Cargo"} style={dataEntryStyles.gamePieceInput}>
					<inputs.SliderInput step={1} minimumValue={0} maximumValue={4} value={this.props.data[dataNames.rocketCargo[i]]} options={gamePieceOptions}
						onValueChange={(value) => this.dataUpdated(value, dataNames.rocketCargo[i])}
					></inputs.SliderInput>
				</inputs.LabeledInput>
			</Row>);

			teleopRockets.push(<Row style={{ paddingBottom: 5 }} key={key++}>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Hatch"} style={dataEntryStyles.gamePieceInput}>
					<inputs.SliderInput step={1} minimumValue={0} maximumValue={4} value={this.props.data[dataNames.rocketHatch[i]]} options={gamePieceOptions}
						onValueChange={(value) => this.dataUpdated(value, dataNames.rocketHatch[i])}
					></inputs.SliderInput>
				</inputs.LabeledInput>
			</Row>);
		}
		teleopRockets.push(<Row key={key++}>
			<Text style={[styles.font.subHeader]}>Cargo Ship</Text>
		</Row>)
		teleopRockets.push(<Row style={{ paddingBottom: 5 }} key={key++}>
			<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Cargo"} style={dataEntryStyles.gamePieceInput}>
				<inputs.SliderInput step={1} minimumValue={0} maximumValue={8} value={this.props.data[dataNames.shipCargo[0]]} options={gamePieceOptions}
					onValueChange={(value) => this.dataUpdated(value, dataNames.shipCargo[0])}
				></inputs.SliderInput>
			</inputs.LabeledInput>
		</Row>)

		teleopRockets.push(<Row style={{ paddingBottom: 5 }} key={key++}>
			<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Hatch"} style={dataEntryStyles.gamePieceInput}>
				<inputs.SliderInput step={1} minimumValue={0} maximumValue={8} value={this.props.data[dataNames.shipHatch[0]]} options={gamePieceOptions}
					onValueChange={(value) => this.dataUpdated(value, dataNames.shipHatch[0])}
				></inputs.SliderInput>
			</inputs.LabeledInput>
		</Row>);

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
		return (<View key={0} style={{ width: "100%", flex: 1, flexDirection: "column" }}>
			{/* Submit and cancel buttons /}
			<Row>
				{/* Cancel button /}
				<TouchableOpacity
					onPress={() => this.onCancel()}
					style={dataEntryStyles.navigationButton}
				>
					<Text style={dataEntryStyles.buttonText}>
						Cancel
					</Text>
				</TouchableOpacity>


				{/* Submit button /}
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
					<MatchList editable matches={[this.props.data]}></MatchList>
				</Row>
				<View style={{ height: headingPadding }}></View>
				{/* Sandstorm phase /}
				<Row>
					<Text style={dataEntryStyles.header}>
						Sandstorm
					</Text>
				</Row>
				<Row style={{ paddingBottom: 5 }}>
					<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Start Level"} style={dataEntryStyles.gamePieceInput}>
						<inputs.PickerInput value={this.props.data[dataNames.startLevel[0]]} options={startLevelOptions} onValueChange={(selected) => this.dataUpdated(selected, dataNames.startLevel[0])}
							style={{
								backgroundColor:
									this.props.data[dataNames.startLevel[0]] == startLevelOptions[0] ?
										styles.colors.tertiary.bg : styles.colors.secondary.bg
							}}
						></inputs.PickerInput>
					</inputs.LabeledInput>
				</Row>
				{sandstormRockets}

				<Row style={{ paddingTop: headingPadding }}>
					<Text style={dataEntryStyles.header}>
						Tele-op
					</Text>
				</Row>
				{teleopRockets}

				<Row style={{ paddingTop: headingPadding }}>
					<Text style={dataEntryStyles.header}>
						Climbing
					</Text>
				</Row>
				{climbing}

				<Row style={{ paddingTop: headingPadding }}>
					<Text style={dataEntryStyles.header}>
						Attributes
					</Text>
				</Row>
				<this.Toggle label="Did the robot break?" variable={dataNames.attributes.broken}></this.Toggle>
				<this.Toggle label="Did the robot tip?" variable={dataNames.attributes.tip}></this.Toggle>
				{/*<this.Toggle label="Can the robot pick up cargo from the depot?" variable={dataNames.attributes.cargoFromDepot}></this.Toggle>/}
				<this.Toggle label="Can it pick up hatches from the floor?" variable={dataNames.attributes.hatchesFromFloor}></this.Toggle>

				<Row>
					<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Time spent on opponents side of field"} style={dataEntryStyles.gamePieceInput}>
						<inputs.TimeInput value={this.props.data[dataNames.gameInfo.opposingSideTime]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.opposingSideTime)}>
						</inputs.TimeInput>
					</inputs.LabeledInput>
				</Row>

				{/*<Row>
					<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Total penalty points earned by alliance"} style={dataEntryStyles.gamePieceInput}>
						<inputs.ClickerInput value={this.props.data[dataNames.gameInfo.penaltyPoints]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.penaltyPoints)}>
						</inputs.ClickerInput>
					</inputs.LabeledInput>
				</Row>}

				<Row>
					<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Number of hatches dropped"} style={dataEntryStyles.gamePieceInput}>
						<inputs.ClickerInput value={this.props.data[dataNames.gameInfo.hatchesDropped]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.hatchesDropped)}>
						</inputs.ClickerInput>
					</inputs.LabeledInput>
				</Row>

				<View style={{ height: 50 }}></View>
				<Row>
					<TouchableOpacity onPress={() => { this.runDeleteMessage() }} style={dataEntryStyles.controlBarButton}>
						<Text style={{ color: styles.colors.dangerous.text, ...styles.font.standardText }}>
							Delete Match
						</Text>
					</TouchableOpacity>
				</Row>
				<View style={{ height: 150 }}></View>
			</ScrollView>
		</View>)
	}*/
}