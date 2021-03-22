import { FormComponent } from './formComponent';

export default class LabelComponent extends FormComponent {
	readonly type: string = "formLabel";

	testValue(value: string) {
		return value == '';
	}
	_encodeValue() {
		return {encoded: 0n, size: 0n};
	}
	_decodeValue() {
		return {data: '', size: 0n};
	}

}
