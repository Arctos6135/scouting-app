import { FormComponent } from './formComponent';

export default class LabelComponent extends FormComponent {
	readonly type: string = "formLabel";
	maxValue() { return 0n; }
	depth() { return 1; }
	testValue(value: string) {
		return value == '';
	}
	_encodeValue(value: string) {
		if (!this.testValue) throw new RangeError("Form labels should not have a value");
		return [0n];
	}
	_decodeValue(value: bigint, level: number) {
		return "";
	}

}

