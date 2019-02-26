import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles'
import AddMatchPopup from './addMatch';
import DataEntry from './dataEntry';
import MatchList from './listMatches';
import QRCodeGenerator from './qrCode';
import { SecureStore } from 'expo';

class ControlBar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<View style={mainScreenStyles.controlBar}>
			<TouchableOpacity onPress={this.props.onAddMatch} style={mainScreenStyles.controlBarButton}>
				<Text style={{ color: styles.colors.highlight.text, ...styles.font.standardText }}>
					Add new match
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={this.props.onViewQRCode} style={[{
				...mainScreenStyles.controlBarButton,
				backgroundColor: styles.colors.secondary.bg,
				flexGrow: 0.75,
				
			}, !this.props.qrCodeExists ? { elevation: 0, backgroundColor: styles.colors.tertiary.bg } : undefined]}
				disabled={!this.props.qrCodeExists}>
				<Text style={{
					color: this.props.qrCodeExists ?
						styles.colors.secondary.text :
						styles.colors.secondary.bg, ...styles.font.standardText
				}}>
					View QR code
				</Text>
			</TouchableOpacity>
		</View>);
	}
}

const pages = {homeScreen: 1, addNewMatch: 2, dataInput: 3, qrCode: 4}
export default class MainScreen extends React.Component {
	state = {
		qrCodeExists: true,
		
		// COMMENTED OUT FOR DEBUGGING
		currentWindow: pages.homeScreen,
		//matches: [],
		dataEntryIndex: -1,
		
		/*
		//DEBUGGING ONLY, STARTS IN EDITOR
		currentWindow: pages.dataInput,
		dataEntryIndex: 0,
		*/
		matches: [{
			"assist": "No assist",
			"broken": false,
			"cargo1": "None",
			"cargo2": "None",
			"cargo3": "None",
			"cargo4": "None",
			"climblvlReached": "No climb",
			"depot": false,
			"floor": false,
			"hatch1": "None",
			"hatch2": "None",
			"hatch3": "None",
			"hatch4": "None",
			"hdropped": 0,
			"matchNumber": 64,
			"opposide": 0,
			"ppoints": 0,
			"rock1c": 0,
			"rock1h": 0,
			"rock2c": 0,
			"rock2h": 0,
			"rock3c": 0,
			"rock3h": 0,
			"rock4c": 0,
			"rock4h": 0,
			"teamNumber": 548,
			"tip": false,
		}, {
				"assist": "No assist",
				"broken": false,
				"cargo1": "None",
				"cargo2": "None",
				"cargo3": "None",
				"cargo4": "None",
				"climblvlReached": "No climb",
				"depot": false,
				"floor": false,
				"hatch1": "None",
				"hatch2": "None",
				"hatch3": "None",
				"hatch4": "None",
				"hdropped": 0,
				"matchNumber": 12,
				"opposide": 0,
				"ppoints": 0,
				"rock1c": 0,
				"rock1h": 0,
				"rock2c": 0,
				"rock2h": 0,
				"rock3c": 0,
				"rock3h": 0,
				"rock4c": 0,
				"rock4h": 0,
				"teamNumber": 654,
				"tip": false,
			}
]
		
	}
	constructor(props) {
		super(props);
		const self = this;
		SecureStore.getItemAsync("matches").then(function (matches) {
			console.log(matches, typeof matches);
			if (matches != "null") self.setState({ matches: JSON.parse(matches) });
		})
	}
	modalCanceled() {
		this.setState({ currentWindow: pages.homeScreen });
	}
	createMatch(teamNumber, matchNumber) {
		this.setState({ currentWindow: pages.dataInput });
		let newMatches = this.state.matches;
		newMatches.push({ teamNumber, matchNumber });
		this.setState({ matches: newMatches, dataEntryIndex: newMatches.length - 1 });
	}
	dataChange(match) {
		let newMatches = this.state.matches;
		newMatches[this.state.dataEntryIndex] = match;
		this.setState({ matches: newMatches });
	}
	render() {
		SecureStore.setItemAsync("matches", JSON.stringify(this.state.matches))
		const self = this;
		if (this.state.currentWindow == pages.dataInput) {
			return (
				<View style={mainScreenStyles.mainScreen}>
					<DataEntry
						return={() => this.setState({ currentWindow: pages.homeScreen })}
						delete={() => {
							let newMatches = this.state.matches;
							newMatches.splice(this.state.dataEntryIndex, 1);
							this.setState({ matches: newMatches });
						}}
						data={this.state.matches[this.state.dataEntryIndex]}
						onDataChange={(match) => this.dataChange(match)}></DataEntry>
				</View>
			)
		}
		else if (this.state.currentWindow == pages.qrCode) {
			return <View style={mainScreenStyles.mainScreen}>
				<QRCodeGenerator data={this.state.matches}
					return={() => this.setState({ currentWindow: pages.homeScreen })}/>
			</View>
		}
		return (
			<View style={mainScreenStyles.mainScreen}>
				<View style={{
					flex: 0.25,
					flexDirection: "row",
					...styles.align.center,
					minHeight: 60,
					marginBottom: 20
				}}>
					<Text style={styles.font.header}>Matches</Text>
				</View>
				<View style={{
					flex: 4,
					width: "100%",
					height: "100%",
					overflow: "scroll"
				}}>
					
					<ScrollView>
						{/*                Whatever it takes                */}
						<MatchList onPress={(index) => {
							this.setState({dataEntryIndex: index, currentWindow: pages.dataInput})
						}} touchable = { true} style = {{ zIndex: 1000000 }
						} matches={this.state.matches}></MatchList>
					</ScrollView>
				</View>
				{/* Display the popup when adding a new match */}
				{this.state.currentWindow == pages.addNewMatch ? 
					<View style={{
						flex: 1,
						position: "absolute",
						width: "100%",
						height: "75%",
						zIndex: 100,
						...styles.align.center
					}}><AddMatchPopup onCancel={() => this.modalCanceled()} onSubmit={(team, match) => this.createMatch(team, match)}></AddMatchPopup></View>
					: null}

				<View style={{ flex: 0.75 }}></View>

				<View style={{
					flex: 1,
					flexDirection: "row"
				}}>
					<ControlBar onViewQRCode={() => this.setState({currentWindow: pages.qrCode})} qrCodeExists={this.state.matches.length > 0} onAddMatch={
						(() => this.setState({ currentWindow: pages.addNewMatch })).bind(this)
						}></ControlBar>
				</View>

				{/* Create a grey cover for everything behind the popup when adding a new match */}
				{this.state.currentWindow == pages.addNewMatch ?
					<View style={{
						width: "125%",
						height: "125%",
						position: 'absolute',
						zIndex: 10,
						backgroundColor: "#000000",
						opacity: 0.5
					}}>
					</View> : null
				}
			</View>
		);
	}
}

const mainScreenStyles = {
	mainScreen: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 20,
		paddingHorizontal: 5,
		width: "100%",
		height: "100%",
		flexDirection: "column"
	},
	controlBar: {
		flex: 1,
		alignSelf: "flex-end",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		height: 130,
		zIndex: 1,
		width: "100%"
	},
	controlBarButton: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: styles.colors.highlight.bg,
		width: "100%",
		margin: 5,
		...styles.shadow
	}
};
