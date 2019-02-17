import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles'


const addMatchStyles = {
	mainPopup: {
		...styles.shadow,
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "85%",
		height: "75%",
		backgroundColor: "#ffffff",
		zIndex: 10,
		elevation: 10
	}
}

export default class AddMatchPopup extends React.Component {
	render() {
		return (
			<View style={addMatchStyles.mainPopup}>
				<Text>Hello</Text>
			</View>
		);
	}
}
