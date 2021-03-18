export type FormData = string | { [id: string]: FormData } | FormData[];

export abstract class FormComponent {
	growWidth?: number;

	constructor(public title: string, public id: string) {}

	abstract readonly type: string;
	// For depths greater than 1 the max value is treated as the maxValue of *1 item*. The decoder will be given maxValue(depth) ** maxValue(depth - 1)
	abstract maxValue(depth?: number): bigint;
	abstract depth(): number;
	abstract testValue(value: FormData): boolean;

	// Returns an encoding for each layer
	encodeValues(value: FormData): bigint[] {
		if (!this.testValue(value)) throw new RangeError(value + ' is an invalid input for ' + this.type);
		return this._encodeValue(value);
	}
	decodeValue(value: bigint, level: number): FormData | bigint {
		if (level >= this.depth()) throw new RangeError(`This ${this.type} only has ${this.depth()} layer(s). Cannot decode value for ${level}`);
		if (value >= this.maxValue()) throw new RangeError('Input too large for ' + this.type);
		if (value < 0n) throw new RangeError('Cannot decode value below zero');
		return this._decodeValue(value, level)
	}
	protected abstract _encodeValue(value: FormData): bigint[];
	// If there are more layers return a bigint representing the maxValue of the following layer
	protected abstract _decodeValue(value: bigint, level: number): FormData | bigint;
}

interface FormLabel extends FormComponent {
	type: "label";
}

interface PickerInput extends FormComponent {
	type: "picker";
	// At least one string
	options: [string] & string[];
}

interface SliderInput extends FormComponent {
	type: "slider";
	range: [number, number];
	increment?: number;
}

interface ToggleInput extends FormComponent {
	type: "toggle";
	options: [string, string];
}

interface TimerInput extends FormComponent {
	type: "timer";
	maxTime: number;
}

interface NumberInput extends FormComponent {
	type: "number";
	increments?: [number, number];
	min: number;
	max: number;
}

interface TextInput extends FormComponent {
	type: 'text';
	maxLength: number;
	allowedChars: Uint8Array;
}

interface RepeatableSection extends FormComponent {
	type: 'repeatable';
	maxRepetitions: number;
	minRepetitions: number;
	section: FormSection;
}

export interface FormSection {
	title: string;
	rows: (FormComponent[] | FormComponent)[];
}
