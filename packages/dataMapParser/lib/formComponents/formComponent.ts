export type FormData = string | { [id: string]: FormData } | FormData[];

export abstract class FormComponent {
	growWidth?: number;

	constructor() {}

	abstract readonly type: string;
	abstract testValue(value: FormData): boolean;

	encodeValue(value: FormData): {encoded: bigint, size: bigint} {
		if (!this.testValue(value)) throw new RangeError(value + ' is an invalid input for ' + this.type);
		return this._encodeValue(value);
	}
	
	// Should assume that this form component is the last one in `value`
	decodeValue(value: bigint): {data: FormData, size: bigint} {
		if (value < 0n) throw new RangeError('Cannot decode value below zero');
		return this._decodeValue(value);
	}

	protected abstract _encodeValue(value: FormData): {encoded: bigint, size: bigint};
	// If there are more layers return a bigint representing the maxValue of the following layer
	protected abstract _decodeValue(value: bigint): {data: FormData, size: bigint};
}
