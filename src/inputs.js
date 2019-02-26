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
import { Switch } from 'react-native-switch';



export class NumberInput extends React.Component {
	state = {
		value: "",
		rawNumber: "",
		editing: false
	}

	constructor(props) {
		super(props);
		this.state.rawNumber = this.getDisplayValue();
	}
	number = 0;
	onChanged(text) {
		let newText = '';
		let numbers = '0123456789' + (this.props.allowFloat ? "." : "");
		
		for (let i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1) {
				newText += text[i];
			}
		}
		this.setState({ rawNumber: newText })
	}
	getDisplayValue() {
		let output;
		if (this.props.allowEmpty && this.state.rawNumber == 0) return "";
		if (this.state.rawNumber != null && this.state.editing) return this.state.rawNumber;
		if (typeof this.props.value == "number") {
			output = this.props.value.toFixed(1);
			if (!this.props.allowFloat) {
				output = parseInt(this.props.value).toString();
			}
		}
		else if (typeof this.props.value == "string") {
			output = this.props.value;
		}
		else if (typeof this.state.value == "number") {
			output = this.state.value.toFixed(1);
			if (!this.props.allowFloat) {
				output = parseInt(this.state.value).toString();
			}
		}
		else {
			output = this.state.value
		}
		if (output == "" || output == "NaN" || output == "0.0") return "0";
		else return output;
	}
	done() {
		if (this.state.rawNumber == "") this.state.rawNumber = "0";
		this.number = this.props.allowFloat ? parseFloat(this.state.rawNumber) : parseInt(this.state.rawNumber);
		if (this.props.onValueChange) this.props.onValueChange(this.number);
		this.setState({ value: this.number, editing: false })
	}
	render() {
		return (
			<TextInput
				style={[this.props.style, styles.inputs.inputBox]}
				keyboardType='numeric'
				onChangeText={(text) => this.onChanged(text)}
				value={this.getDisplayValue()}
				maxLength={this.props.maxLength}  //setting limit of input
				returnKeyType='done'
				onBlur={() => this.done()}
				onSubmitEditing={() => this.done()}
				onFocus={() => this.setState({ editing: true })}
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
				<Slider
					thumbTouchSize={{width: 75, height: 75}}
					thumbStyle={{ backgroundColor: styles.colors.secondary.bg }} minimumTrackTintColor={styles.colors.highlight.bg} maximumTrackTintColor={styles.colors.tertiary.bg} step={this.props.step} minimumValue={this.props.minimumValue} maximumValue={this.props.maximumValue} value={this.props.value || 0} style={[{ flex: 1 }, this.props.sliderStyle]} onValueChange={(v) => this.props.onValueChange(v)}></Slider>
				<View style={{ flex: 0.1 }}></View>
				<Text style={[{ flex: 0.25, ...styles.align.center }, this.props.inputStyle]}>{this.props.value}</Text>
			</View>
		)
	}
}

export class ToggleInput extends React.Component {
	onChanged(value) {
		if (this.props.onValueChange) this.props.onValueChange(value)
	}
	render() {
		return <View style={{flexDirection: "row", alignItems: "center"}}><Switch
			value={this.props.value}
			onValueChange={(val) => this.onChanged(val)}
			disabled={this.props.disabled}
			backgroundActive={this.props.onBackground || styles.colors.highlight.bg}
			backgroundInactive={this.props.offBackground || styles.colors.tertiary.bg}
			circleBorderWidth={this.props.circleBorderWidth || 0}
			circleActiveColor={styles.colors.secondary.bg}
			circleInActiveColor={styles.colors.secondary.bg}
		></Switch><Text style={{marginLeft: 10}}>{this.props.value ? this.props.activeText : this.props.inactiveText}</Text></View>
	}
}

export class TimeInput extends React.Component {
	state = {
		running: false,
		value: 0
	}
	timer = null;
	constructor(props) {
		super(props);
		this.state.value = props.value;
	}
	componentWillUnmount() {
		if (this.timer != null) clearImmediate(this.timer);
	}
	onChanged(value) {
		if (this.props.onValueChange && !this.state.running) {
			this.setState({ value: value });
			this.props.onValueChange(value);
		}
	}
	toggle() {
		const timestep = 10;
		const self = this;
		const wasRunning = this.state.running;
		this.setState({ running: !this.state.running })
		if (!wasRunning) {
			let date = Date.now();
			this.timer = setInterval(() => {
				self.timeSet(Date.now() - date);
			}, timestep);

		}
		else {
			clearInterval(this.timer);
			if (this.props.onValueChange) {
				this.props.onValueChange(this.state.value);
			}
		}
	}
	timeSet(amount) {
		this.setState({ value: this.props.value + amount / 1000 })
	}
	reset() {
		this.setState({ value: 0 });
		this.onChanged(0);
	}
	render() {
		return <View style={[{ flexDirection: "row", alignItems: "stretch" }, this.props.style]}>
			<TouchableOpacity
				onPress={() => this.reset()}
				style={{ flex: 1, ...styles.align.center }}
				hitSlop={{ top: 20, bottom: 20, left: 0, right: 0 }}
			><Text style={{ fontWeight: "bold", ...styles.align.center }}>Reset</Text></TouchableOpacity>
			<NumberInput style={{ flex: 2, ...styles.align.center }} allowFloat onValueChange={(value) => this.onChanged(value)} value={this.state.value}></NumberInput>
			<TouchableOpacity
				onPress={() => this.toggle()}
				style={{ flex: 1, ...styles.align.center }}
				hitSlop={{ top: 20, bottom: 20, left: 0, right: 0 }}
			><Text style={{ fontWeight: "bold", ...styles.align.center}}>{this.state.running ? "Stop" : "Start"}</Text></TouchableOpacity>
	
		</View>
	}
}

const clickerCounter = {
	text: {
		fontSize: 30,
		...styles.align.center
	},
	container: {
		...styles.align.center,
		flex: 1,
	}
}
export class ClickerInput extends React.Component {
	onValueChange(value) {
		if (this.props.onValueChange) this.props.onValueChange(value)
	}
	dec() {
		if (this.props.onValueChange) this.props.onValueChange(this.props.value - 1);
	}
	inc() {
		if (this.props.onValueChange) this.props.onValueChange(this.props.value + 1);
	}
	render() {
		return <View style={[{ flexDirection: "row", alignItems: "stretch" }, this.props.style]}>
			<TouchableOpacity
				hitSlop={{ top: 20, bottom: 20, left: 0, right: 0 }}
				onPress={() => this.dec()} style={clickerCounter.container}><Text style={clickerCounter.text}>-</Text></TouchableOpacity>
			<NumberInput style={{ flex: 2, ...styles.align.center}} onValueChange={(v) => this.onValueChange(v)} value={this.props.value}></NumberInput>
			<TouchableOpacity
				hitSlop={{ top: 20, bottom: 20, left: 0, right: 0 }}
				onPress={() => this.inc()} style={clickerCounter.container}><Text style={clickerCounter.text}>+</Text></TouchableOpacity>
		</View>
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