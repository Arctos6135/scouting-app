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
				<Text style={{ color: styles.colors.highlight.text, fontSize: 18 }}>
					Add new match
				</Text>
			</TouchableOpacity>
			{this.props.qrCodeExists ? (<TouchableOpacity onPress={this.props.onViewQRCode} style={{
				...mainScreenStyles.controlBarButton,
				backgroundColor: styles.colors.secondary.bg,
				flexGrow: 0.75
			}}>
				<Text style={{ color: styles.colors.secondary.text, fontSize: 18 }}>
					View QR code
				</Text>
			</TouchableOpacity>)
				: null}
		</View>);
	}
}

const pages = {HOMESCREEN: 1, ADDNEWMATCH: 2}
export default class MainScreen extends React.Component {
	state = {
		qrCodeExists: true,
		matches: [],
		currentWindow: pages.HOMESCREEN
	}
	render() {
		const self = this;
		return (
			<View style={mainScreenStyles.mainScreen}>
				<View style={{
					flex: 1,
					flexDirection: "row",
					flexGrow: 0.25,
					justifySelf: "start",
					justifyContent: "center",
					alignItems:"center"
				}}>
					<Text style={{fontSize: 24}}>Matches</Text>
				</View>
				{this.state.currentWindow == pages.ADDNEWMATCH ? 
					<View style={{
						flex: 1,
						position: "absolute",
						width: "100%",
						height: "75%",
						alignItems: "center",
						justifyContent: "center"
					}}><AddMatchPopup></AddMatchPopup></View>
					: null}
				<View style={{
					flex: 1,
					flexDirection: "row",
					alignSelf: "flex-end",
					flexGrow: 1
				}}>
					<ControlBar qrCodeExists={self.state.qrCodeExists} onAddMatch={
						(() => this.setState({ currentWindow: pages.ADDNEWMATCH })).bind(this)
						}></ControlBar>
				</View>
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
