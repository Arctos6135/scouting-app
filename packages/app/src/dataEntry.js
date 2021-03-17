import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './styles'
import * as inputs from './inputs'
import MatchList from './listMatches'
import { popupStyles } from './popups'
import { startLevelOptions, dataNames, dataTypes, assistOptions, gamePieceOptions, climbOptions, defaultAssistOption, defaultClimbOption, defaultGamePieceOption, dmap } from './dataMap'
import { AsyncStorage } from 'react-native';

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

export class DataMap {
	Toggle = (props) => <Row style={{ marginBottom: 10 }}>
		<inputs.LabeledInput textStyle={styles.font.dataEntry} label={props.label} style={dataEntryStyles.gamePieceInput}>
			<inputs.ToggleInput
				onValueChange={(selected) =>
					this.dataUpdated(Number(selected), props.variable)}
				activeText={props.active}
				inactiveText={props.inactive}
				value={this.data[props.variable] == 1}></inputs.ToggleInput>
		</inputs.LabeledInput>
	</Row>

	Timer = (props) => <Row style={{ marginBottom: 10 }}>
		<inputs.LabeledInput textStyle={styles.font.dataEntry} label={props.label} style={dataEntryStyles.gamePieceInput}>
			<inputs.TimerInput
				onValueChange={(selected) =>
					this.dataUpdated(selected, props.variable)}
				value={this.data[props.variable]}></inputs.TimerInput>
		</inputs.LabeledInput>
	</Row>
	constructor(data, cb) {
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
			for (let r of section.rows) {
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
		this.data = {};
		for (let i of this.variables) {
			this.data[i] = 0;
		}
		this.cb = cb;
		this.key = 0;
	}
	generateEntry() {
		let out = [];
		this.key = 0;
		for (let i in this.components) out.push(this.getRow(this.components[i]));
		return out;
	}
	getComponent(component, key) {

		switch (component.type) {
			case "header":
				return (
					<View key={key}>
						<View style={{ height: headingPadding }}></View>
						<Text key={key} style={dataEntryStyles.header}>
							{component.title}
						</Text>
					</View>)
					break;
				case "text":
				return (<Text key={key} style={[styles.font.subHeader]}>{component.title}</Text>)
				break;
			case "picker":
				return (<inputs.LabeledInput key={key} textStyle={styles.font.dataEntry} label={component.title} style={dataEntryStyles.gamePieceInput}>
					<inputs.PickerInput value={component.options[this.data[component.id]]} options={component.options}
						onValueChange={(selected) => this.dataUpdated(component.options.indexOf(selected), component.id)}
						style={{
							backgroundColor:
								this.data[component.id] == 0 ?
									styles.colors.tertiary.bg : styles.colors.secondary.bg
						}}
					></inputs.PickerInput>
				</inputs.LabeledInput>);
				break;
			case "slider":
				return (<inputs.LabeledInput key={key} textStyle={styles.font.dataEntry} label={component.title} style={dataEntryStyles.gamePieceInput}>
					<inputs.SliderInput step={component.increment || 1} minimumValue={component.range[0]} maximumValue={component.range[1]} value={this.data[component.id]}
						onValueChange={(value) => this.dataUpdated(value, component.id)}
					></inputs.SliderInput>
				</inputs.LabeledInput>)
				break;
			case "toggle":
				return (<this.Toggle label={component.title} variable={component.id} active={component.options[1]} inactive={component.options[0]}></this.Toggle>)
				break;
			case "timer":
				return (<inputs.LabeledInput key={key} textStyle={styles.font.dataEntry} label={component.title} style={dataEntryStyles.gamePieceInput}>
					<inputs.TimeInput value={this.data[component.id]} onValueChange={(value) => this.dataUpdated(value, component.id)}>
					</inputs.TimeInput>
				</inputs.LabeledInput>);
				break;
			case "number":
				return (<inputs.LabeledInput key={key} textStyle={styles.font.dataEntry} label={component.title} style={dataEntryStyles.gamePieceInput}>
					<inputs.ClickerInput value={this.data[component.id]} onValueChange={(value) => this.dataUpdated(value, component.id)}>
					</inputs.ClickerInput>
				</inputs.LabeledInput>)
				break;
		}
	}
	updateData(newData) {
		this.data = newData;
		this.cb();
	}
	dataUpdated(newValue, id) {
		this.data[id] = newValue;
		this.cb();
	}
	getRow(component) {
		let output;
		if (Array.isArray(component)) {
			let row = [];
			for (let c of component) {
				row.push(this.getComponent(c, this.key++));
				this.key++;
				row.push(<Spacer key={this.key++}></Spacer>)
			}
			row = row.slice(0, -1);
			output = (<Row key={this.key++}>{row}</Row>)
		}
		else {
			output = (<Row key={this.key++}>{this.getComponent(component, this.key++)}</Row>)
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
	constructor(props) {
		super(props);
		this.state = {
			dead: false,
			dataMap: null
		}
		AsyncStorage.getItem("dataMap").then((d) => {
			// TODO: Maybe needs a case to prevent failure if dataMap doesn't exist yet
			console.log("datamap loaded");
			this.parseDataMap(JSON.parse(d)[props.formType].form);

		});
	}
	
	parseDataMap(dataMap) {
		this.dataMap = new DataMap(dataMap, () => {
			this.props.onDataChange(this.dataMap.data);
			this.setState();
		})
		this.dataMap.data.teamNumber = this.props.data.teamNumber;
		this.dataMap.data.matchNumber = this.props.data.matchNumber;
		this.dataMap.data.formType = this.props.data.formType;
		if (this.props.data['#']) {
			this.props.onDataChange(this.dataMap.data);
		}
		else {
			this.dataMap.updateData(this.props.data)
		}
		this.originalValue = { ...this.dataMap.data };
	}

	render() {
		if (this.state.dead) return <View></View>
		if (!this.dataMap) return <View></View>;
	
		let dataEntry = this.dataMap.generateEntry();

		return (<View style={{ width: "100%", flex: 1, flexDirection: "column" }}>
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
		this.dataMap.updateData(this.originalValue);
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
}