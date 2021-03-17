import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles'
import * as inputs from './inputs.js'

export default class MatchList extends React.Component {
	render() {
		if (!this.props.matches) return (<View></View>)

		let matches = [];
		for (let i in this.props.matches) {
			if (this.props.matches[i].deleted) continue;
			matches.push(
				<TouchableOpacity key={i} disabled={!this.props.touchable}
					onPress={() => {
						this.props.onPress(i)
					}}
					style={{
						width: "100%"
					}}
				>
					<View style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}>
						<View style={{ flex: 1 }}>
							{this.props.editable ? <inputs.NumberInput onValueChange={(value) => this.updateMatchNumber(value, i)} value={this.props.matches[i].matchNumber} style={{ flex: 1, textAlign: "right", ...styles.font.matchInfo }} /> : <Text style={{ flex: 1, textAlign: "right", ...styles.font.matchInfo }}>{this.props.matches[i].matchNumber}</Text>}
						</View>
						<View style={{ flex: 0.3 }}></View>
						<View style={{ flex: 1 }}>
							{this.props.editable ? <inputs.NumberInput onValueChange={(value) => this.updateTeamNumber(value, i)} value={this.props.matches[i].teamNumber} style={{ flex: 1, textAlign: "left", ...styles.font.matchInfo }} /> : <Text style={{ flex: 1, textAlign: "left", ...styles.font.matchInfo }}>{this.props.matches[i].teamNumber}</Text>}
						</View>

					</View>
				</TouchableOpacity>
			)
		}
		return <View style={[{
			flex: 1,
			flexDirection: "column"
		}, this.props.style]}>
			<View style={{
				flexDirection: "row",
				justifyContent: "space-between"
			}}>
				<View style={{ flex: 1 }}>
					<Text style={{ flex: 1, textAlign: "right" }}>Match number</Text>
				</View>
				<View style={{ flex: 0.3 }}></View>
				<View style={{ flex: 1 }}>
					<Text style={{ flex: 1, textAlign: "left" }}>Team number</Text>
				</View>
			</View>
			<View style={{ height: 8 }}></View>
			{matches}
		</View>
	}

	updateMatchNumber(value, i) {
		console.log('update match number');
		this.props.matches[i].matchNumber = value;
		this.setState({});
	}
	updateTeamNumber(value, i) {
		console.log('update team number');
		this.props.matches[i].teamNumber = value;
		this.setState({});
	}
}