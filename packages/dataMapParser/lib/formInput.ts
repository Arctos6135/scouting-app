interface FormInput {
	title: string;
	type: string;
	id: string;
	growWidth?: number;
}

interface FormLabel extends FormInput {
	type: "label";
}

interface PickerInput extends FormInput {
	type: "picker";
	// At least one string
	options: [string] & string[];
}

interface SliderInput extends FormInput {
	type: "slider";
	range: [number, number];
	increment?: number;
}

interface ToggleInput extends FormInput {
	type: "toggle";
	options: [string, string];
}

interface TimerInput extends FormInput {
	type: "timer";
	maxTime: number;
}

interface NumberInput extends FormInput {
	type: "number";
	increments?: [number, number];
	min: number;
	max: number;
}

interface TextInput extends FormInput {
	type: 'text';
	maxLength: number;
	allowedChars: Uint8Array;
}

interface RepeatableSection extends FormInput {
	type: 'repeatable';
	maxRepetitions: number;
	minRepetitions: number;
	section: FormSection;
}

export type FormComponent = FormLabel | PickerInput | SliderInput | ToggleInput | TimerInput | NumberInput | TextInput | RepeatableSection;

export interface FormSection {
	title: string;
	rows: (FormComponent[] | FormComponent)[];
}
