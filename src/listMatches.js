import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles'
import * as inputs from './inputs.js'

export default class MatchList extends React.Component {
	render() {
		if (!this.props.matches) return (<View></View>)
		
		let matches = [];
		for (let i in this.props.matches) {
			console.log(this.props.matches[i]);
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
						justifyContent: "center"
					}}>	
						<View style={{ flex: 1 }}>
							<Text style={{ flex: 1, textAlign: "center", ...styles.font.matchInfo }}>{this.props.matches[i].matchNumber}</Text>
						</View>
						<View style={{ flex: 0.3 }}></View>
						<View style={{flex: 1}}>
							<Text style={{ flex: 1, textAlign: "center", ...styles.font.matchInfo }}>{this.props.matches[i].teamNumber}</Text>
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
				justifyContent: "center"
			}}>
				<View style={{ flex: 1 }}>
					<Text style={{ flex: 1, textAlign: "center" }}>Match number</Text>
				</View>
				<View style={{ flex: 0.1 }}></View>
				<View style={{ flex: 1 }}>
					<Text style={{ flex: 1, textAlign: "center" }}>Team number</Text>
				</View>
			</View>
			{matches}
		</View>
	}
}