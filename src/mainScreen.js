import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './styles'
import AddMatchPopup from './addMatch';
import DataEntry from './dataEntry';
import MatchList from './listMatches';
import QRCodeGenerator from './qrCode';
import * as SecureStore from 'expo-secure-store';

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

const pages = { homeScreen: 1, addNewMatch: 2, dataInput: 3, qrCode: 4 }
export default class MainScreen extends React.Component {
	state = {
		qrCodeExists: true,
		currentWindow: pages.homeScreen,
		dataEntryIndex: -1,
		matches: []
	}
	constructor(props) {
		super(props);
		const self = this;
		SecureStore.getItemAsync("matches").then(function (matches) {
			if (!matches) return;
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
							newMatches[this.state.dataEntryIndex].deleted = true;
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
					return={() => this.setState({ currentWindow: pages.homeScreen })} />
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
							this.setState({ dataEntryIndex: index, currentWindow: pages.dataInput })
						}} touchable={true} style={{ zIndex: 1000000 }
						} matches={this.state.matches}></MatchList>

						<TouchableOpacity onPress={() => { this.runDeleteAllMessage() }} style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: styles.colors.dangerous.bg,
							width: "100%",
							margin: 5
						}}>
							<Text style={{ color: styles.colors.dangerous.text, ...styles.font.standardText }}>
								Delete ALL matches
						</Text>
						</TouchableOpacity>
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
					<ControlBar onViewQRCode={() => this.setState({ currentWindow: pages.qrCode })} qrCodeExists={this.state.matches.length > 0} onAddMatch={
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
	runDeleteAllMessage() {
		const self = this;
		Alert.alert("Are you sure?",
			"This will delete every match you have created from your phone",
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: "Yes", onPress: () => {
						self.deleteAll();
					}
				}
			],
			{ cancelable: true });
	}
	deleteAll() {
		this.setState({ matches: [] })
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
