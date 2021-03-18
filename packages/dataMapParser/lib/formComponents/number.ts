import { FormComponent } from './formComponent';

export default class NumberComponent extends FormComponent {
	readonly type: string = "number";
	constructor(title: string, public readonly range: [number, number], public steps: number, id: string) {
		super(title, id);
		if (this.range[0] >= this.range[1]) throw new RangeError('Lower bound must be less than upper bound in');
	}
	maxValue() {
		return BigInt(this.steps);
	}
	depth() { return 1; }
	testValue(value: string) {
		if (!/^\d+(\.\d+)?$/.test(value)) return false;

		const num = parseFloat(value);
		return num >= this.range[0] && num < this.range[1];
	}

	// Numbers get rounded to the nearest step in the encoding process
	_encodeValue(value: string) {
		const num = parseFloat(value);
		const normalized = (num - this.range[0]) / (this.range[1] - this.range[0]);
		return [BigInt(Math.floor(normalized * this.steps))];
	}
	_decodeValue(value: bigint, level: number) {
		const num = Number(value) / this.steps;
		return (num * (this.range[1] - this.range[0]) + this.range[0]).toString();
	}

}

