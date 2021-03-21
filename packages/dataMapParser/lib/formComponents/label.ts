import { FormComponent } from './formComponent';

export default class LabelComponent extends FormComponent {
	readonly type: string = "formLabel";
	testValue(value: string) {
		return value == '';
	}
	_encodeValue(value: string) {
		return {encoded: 0n, size: 0n};
	}
	_decodeValue(value: bigint) {
		return {data: '', size: 0n};
	}

}

