import { FormComponent, FormData } from './formComponent';

export default class TextComponent extends FormComponent {
	public readonly type: string = 'text';
	public readonly charValues: {[c: string]: bigint};
	public readonly allowedChars: string[];
	public readonly base: bigint;

	constructor(title: string, public maxLength: number, allowedChars: string, id: string) {
		super(title, id);
		this.charValues = {};
		let c = 0n;
		this.allowedChars = [];
		for (let i = 0; i < allowedChars.length; i++) {
			if (!this.charValues[allowedChars[i]]) {
				this.allowedChars[Number(c)] = allowedChars[i];
				this.charValues[allowedChars[i]] = c++;
			}
		}
		this.base = c;
	}
	depth() { return 2; }
	maxValue(depth?: number) {
		if (depth == 1) return this.base;
		return BigInt(this.maxLength);
	}
	testValue(value: FormData) {
		if (typeof value != 'string') return false
		if (value.length >= this.maxLength) return false;
		for (let i = 0; i < value.length; i++) {
			if (!(value[i] in this.charValues)) return false;
		}
		return true;
	}

	_encodeValue(value: FormData) {
		// Value will always be a string because encodeValue only gets called after testValue returns true, but typescript needs to know that it is guaranteed to be a string.
		if (typeof value != 'string') return [0n, 0n];
		let cursor = 1n;
		let encoding = 0n;
		for (let i = value.length - 1; i >= 0; i++) {
			encoding += cursor * this.charValues[value[i]];
			cursor *= this.base;
		}

		return [BigInt(value.length), encoding];
	}

	_decodeValue(value: bigint, level: number) {
		if (level == 0) return value;
		else return this.allowedChars[Number(value)];
	}
}
