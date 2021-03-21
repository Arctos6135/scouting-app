import { FormComponent, FormData } from './formComponent';

export default class SectionComponent extends FormComponent {
	readonly type: string = "section";
	// string[] & [string] is an array with at least one string
	constructor(public readonly subComponents: FormComponent[]) {
		super();
	}
	depth() { return 1; }
	testValue(values: FormData[]) {
		for (let i = 0; i < values.length; i++) {
			if (!this.subComponents[i].testValue(values[i])) return false;
		}
		return true;
	}
	_encodeValue(values: FormData[]) {
		let total = 0n;
		let size = 1n;

		for (let i = 0; i < values.length; i++) {
			const encoded = this.subComponents[i].encodeValue(values[i]);
			total *= encoded.size;
			total += encoded.encoded;
			size *= encoded.size;
		}

		return { encoded: total, size };
	}
	_decodeValue(value: bigint) {
		let size = 1n;
		let output: FormData[] = [];

		for (let i = this.subComponents.length - 1; i >= 0; i--) {
			const decoded = this.subComponents[i].decodeValue(value);
			size *= decoded.size;
			output.unshift(decoded.data);
			value /= decoded.size;
		}

		return { data: output, size }
	}

}

