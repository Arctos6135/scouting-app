import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles'

export class NumberInput extends React.Component {
	state = {
		value: ""
	}
	onChanged(text) {
		let newText = '';
		let numbers = '0123456789';

		for (var i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1) {
				newText = newText + text[i];
			}
			else {
				alert("please enter numbers only");
			}
		}
		this.setState({ value: newText });
		if (this.props.onValueChange) this.props.onValueChange(parseInt(newText));
	}
	render() {
		return (
			<TextInput
				style={[this.props.style, styles.inputs.inputBox]}
				keyboardType='numeric'
				onChangeText={(text) => this.onChanged(text)}
				value={this.state.value.toString()}
				maxLength={this.props.maxLength}  //setting limit of input
			/>
		)
	}
}

export class LabeledInput extends React.Component {
	render() {
		return <View style={this.props.style}>
			<Text style={[this.props.textStyle, {width: "100%", marginBottom: 2}]}>{this.props.label}</Text>
			{this.props.children}
		</View>
	}
}