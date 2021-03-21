import { FormComponent } from './formComponent';

export default class PickerComponent extends FormComponent {
	readonly type: string = "picker";
	constructor(public readonly options: string[]) {
		super();
		if (this.options.length == 0) throw new Error('Pickers must have at least 1 option');
	}
	maxValue() {
		return BigInt(this.options.length);
	}
	testValue(value: string) {
		return this.options.includes(value);
	}
	_encodeValue(value: string) {
		return {encoded: BigInt(this.options.indexOf(value)), size: BigInt(this.options.length)};
	}
	_decodeValue(value: bigint) {
		return {data: this.options[Number(value % BigInt(this.options.length))], size: BigInt(this.options.length)}
	}

}

