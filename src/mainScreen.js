import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles'
import AddMatchPopup from './addMatch';

class ControlBar extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}
	render() {
		console.log(this.props);
		return (<View style={mainScreenStyles.controlBar}>
			<TouchableOpacity onPress={this.props.onAddMatch} style={mainScreenStyles.controlBarButton}>
				<Text style={{ color: styles.colors.highlight.text, ...styles.font.standardText }}>
					Add new match
				</Text>
			</TouchableOpacity>
			{this.props.qrCodeExists ? (<TouchableOpacity onPress={this.props.onViewQRCode} style={{
				...mainScreenStyles.controlBarButton,
				backgroundColor: styles.colors.secondary.bg,
				flexGrow: 0.75
			}}>
				<Text style={{ color: styles.colors.secondary.text, ...styles.font.standardText }}>
					View QR code
				</Text>
			</TouchableOpacity>)
				: null}
		</View>);
	}
}

const pages = {HOMESCREEN: 1, ADDNEWMATCH: 2, DATAINPUT: 3}
export default class MainScreen extends React.Component {
	state = {
		qrCodeExists: true,
		matches: [],
		currentWindow: pages.HOMESCREEN,
		matches: []
	}
	modalCanceled() {
		this.setState({ currentWindow: pages.HOMESCREEN });
	}
	createMatch(teamNumber, matchNumber) {
		this.setState({ currentWindow: pages.DATAINPUT });
		console.log(teamNumber, matchNumber);
		let newMatches = this.state.matches;
		newMatches.push({ teamNumber, matchNumber });
		this.setState({ matches: newMatches });
	}
	render() {
		const self = this;
		return (
			<View style={mainScreenStyles.mainScreen}>
				<View style={{
					flex: 0.25,
					flexDirection: "row",
					...styles.align.center
				}}>
					<Text style={styles.font.header}>Matches</Text>
				</View>
				
				{/* Display the popup when adding a new match */}
				{this.state.currentWindow == pages.ADDNEWMATCH ? 
					<View style={{
						flex: 1,
						position: "absolute",
						width: "100%",
						height: "75%",
						zIndex: 100,
						...styles.align.center
					}}><AddMatchPopup onCancel={() => this.modalCanceled()} onSubmit={(team, match) => this.createMatch(team, match)}></AddMatchPopup></View>
					: null}
				

				<View style={{
					flex: 1,
					flexDirection: "row",
				}}>
					<ControlBar qrCodeExists={self.state.qrCodeExists} onAddMatch={
						(() => this.setState({ currentWindow: pages.ADDNEWMATCH })).bind(this)
						}></ControlBar>
				</View>

				{/* Create a grey cover for everything behind the popup when adding a new match */}
				{this.state.currentWindow == pages.ADDNEWMATCH ?
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
		padding: 20,
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
