import { FormComponent } from './formComponent';

export default class NumberComponent extends FormComponent {
	readonly type: string = "number";
	constructor(public readonly range: [number, number], public steps: number) {
		super();
		if (this.range[0] >= this.range[1]) throw new RangeError('Lower bound must be less than upper bound in');
	}
	testValue(value: string) {
		if (!/^\d+(\.\d+)?$/.test(value)) return false;

		const num = parseFloat(value);
		return num >= this.range[0] && num < this.range[1];
	}

	// Numbers get rounded to the nearest step in the encoding process
	_encodeValue(value: string) {
		const num = parseFloat(value);
		const normalized = (num - this.range[0]) / (this.range[1] - this.range[0]);
		return {encoded: BigInt(Math.floor(normalized * this.steps)), size: BigInt(this.steps)}
	}
	_decodeValue(value: bigint) {
		const num = Number(value % BigInt(this.steps)) / this.steps;
		return {data: (num * (this.range[1] - this.range[0]) + this.range[0]).toString(), size: BigInt(this.steps)};
	}

}

