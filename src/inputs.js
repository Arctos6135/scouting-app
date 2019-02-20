import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Slider from 'react-native-slider'
import styles from './styles'
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
	MenuProvider
} from 'react-native-popup-menu';


export class NumberInput extends React.Component {
	state = {
		value: ""
	}
	number = 0;
	onChanged(text) {
		let newText = '';
		let numbers = '0123456789' + this.props.allowFloat ? "." : "";

		for (var i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1) {
				newText = newText + text[i];
			}
		}
		number = parseFloat(newText);
		if (this.props.onValueChange) this.props.onValueChange(parseInt(this.state.value));
	}
	render() {
		return (
			<TextInput
				style={[this.props.style, styles.inputs.inputBox]}
				keyboardType='numeric'
				onChangeText={(text) => this.onChanged(text)}
				value={this.props.value ? this.props.value.toString() : this.state.value.toString()}
				maxLength={this.props.maxLength}  //setting limit of input
				returnKeyType='done'
			/>
		)
	}
}


export class PickerInput extends React.Component {
	render() {
		let current = 0;
		return (
			<Menu onSelect={this.props.onValueChange}>
				<MenuTrigger text={this.props.value} style={[{
					backgroundColor: styles.colors.secondary.bg,
					padding: 10
				}, this.props.style]} />
				<MenuOptions>
					{this.props.options ?
						this.props.options.map((v) =>
							<MenuOption style={[{ padding: 10 }, this.props.textStyle]} key={current++} value={v} text={v}></MenuOption>
						)
						: null}
				</MenuOptions>
			</Menu>)
	}
}

export class SliderInput extends React.Component {
	render() {
		return (
			<View style={[this.props.style, {flexDirection: "row"}]}>
				<Slider thumbStyle={{ backgroundColor: styles.colors.highlight.bg }} minimumTrackTintColor={styles.colors.highlight.bg} maximumTrackTintColor={styles.colors.tertiary.bg} step={this.props.step} minimumValue={this.props.minimumValue} maximumValue={this.props.maximumValue} value={this.props.value || 0} style={[{ flex: 1 }, this.props.sliderStyle]} onValueChange={(v) => this.props.onValueChange(v)}></Slider>
				<View style={{ flex: 0.1 }}></View>
				<NumberInput style={[{ flex: 0.25 }, this.props.inputStyle]} onChanged={(v) => this.props.onValueChange(v)} value={this.props.value || "0"} maxLength={this.props.maxLength}></NumberInput>
			</View>
		)
	}
}
		
export class LabeledInput extends React.Component {
	render() {
		return <View style={this.props.style}>
			<Text style={[this.props.textStyle, { width: "100%", marginBottom: 2 }]}>{this.props.label}</Text>
			{this.props.children}
		</View>
	}
}