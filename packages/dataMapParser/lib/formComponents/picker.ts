import { FormComponent } from './formComponent';

export default class PickerComponent extends FormComponent {
	readonly type: string = "picker";
	// string[] & [string] is an array with at least one string
	constructor(title: string, public readonly options: string[], id: string) {
		super(title, id);
		if (this.options.length == 0) throw new Error('Pickers must have at least 1 option');
	}
	maxValue() {
		return BigInt(this.options.length);
	}
	depth() { return 1; }
	testValue(value: string) {
		return this.options.includes(value);
	}
	_encodeValue(value: string) {
		if (!this.testValue) throw new RangeError("Invalid form ");
		return [ BigInt(this.options.indexOf(value)) ];
	}
	_decodeValue(value: bigint) {
		return this.options[Number(value)];
	}

}

