import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/mainScreen'
import { MenuProvider, Menu } from 'react-native-popup-menu';

console.reportErrorsAsExceptions = false;

export default class App extends React.Component {
	render() {
		return (
			<MenuProvider>
				<View style={styles.container}>
					<MainScreen></MainScreen>
				</View>
			</MenuProvider>
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
