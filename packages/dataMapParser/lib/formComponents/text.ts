import { FormComponent, FormData } from './formComponent';

export default class TextComponent extends FormComponent {
	public readonly type: string = 'text';
	public readonly charValues: {[c: string]: bigint};
	public readonly allowedChars: string[];
	public readonly base: bigint;

	constructor(public readonly maxLength: number, allowedChars: string) {
		super();
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

	calculateSize(length: number) {
		return (this.base ** BigInt(length) - 1n) * BigInt(this.maxLength) + BigInt(this.maxLength);
	}

	testValue(value: FormData) {
		if (typeof value != 'string') return false
		if (value.length >= this.maxLength) return false;
		for (let i = 0; i < value.length; i++) {
			if (!(value[i] in this.charValues)) return false;
		}
		return true;
	}

	_encodeValue(value: string) {
		// Value will always be a string because encodeValue only gets called after testValue returns true, but typescript needs to know that it is guaranteed to be a string.
		if (typeof value != 'string') return {encoded: 0n, size: 0n};
		let cursor = 1n;
		let encoding = 0n;
		for (let i = 0; i < value.length; i++) {
			encoding += cursor * this.charValues[value[i]];
			cursor *= this.base;
		}

		return { 
			encoded: BigInt(value.length) + encoding * BigInt(this.maxLength), 
			size: this.calculateSize(value.length)
		};
	}

	_decodeValue(value: bigint) {
		const length = value % BigInt(this.maxLength);
		value /= BigInt(this.maxLength);
		let out = '';
		
		let i: bigint = 0n;
		while (length - (i++)) {
			out += this.allowedChars[Number(value % this.base)];
			value /= this.base;
		}
		return { 
			data: out, 
			size: this.calculateSize(Number(length))
		}
	}
}
