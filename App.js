import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/mainScreen'

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<MainScreen></MainScreen>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		alignItems: "center",
		padding: 20
	},
});
