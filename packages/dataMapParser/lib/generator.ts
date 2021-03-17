import { DataMap, FormData } from './dataMap';
import { FormComponent, FormSection } from './formInput';

type DataSchema = { [id: string]: FormComponent };

function getDataSchema(dataMap: DataMap | FormSection): DataSchema {
	const schema: DataSchema = {};

	for (let section of 'form' in dataMap ? dataMap.form : [dataMap]) {
		for (let row of section.rows) {
			if (Array.isArray(row)) for (let el of row) schema[el.id] = el;
			else schema[row.id] = row;
		}
	}

	return schema;
}

/**
 * @returns A list of binary encodings for each pointer level
 * */
function getBits(id: string, data: FormData, dataSchema: DataSchema, repeatable: boolean=false): { value: bigint, maxValue: bigint }[] {
	if (dataSchema[id].type == 'text') {
		let textLength: bigint = BigInt(data[id].toString().length);

		let textValue: bigint = 0n;
		let currentPower = 1n;
		for (let i = 0; i < data[id].toString().length; i++) {
			const char = data[id].toString()[i].charCodeAt(0);
			const idx = dataSchema[id].allowedChars.indexOf(char);
			if (idx == -1) throw new RangeError(char + ' is not an allowed character for text input ' + id);
			textValue += currentPower * idx;
			currentPower *= dataSchema[id].allowedChars.length;
		}

		let maxTextValue: bigint = BigInt(dataSchema[id].allowedChars.length) ** textLength;
		return [
			{ value: textLength, maxValue: BigInt(dataSchema[id].maxLength) },
			{ value: textValue, maxValue: maxTextValue }
		]
	}
	else if (dataSchema[id].type == 'number') {

	}
	else {
		const _exhaustiveCheck: never = dataSchema[id].type;
		return _exhaustiveCheck;
	}
}

export class BitSchema {
	schema: BitSchemaComponent[] = [];
	constructor(public dataMap: DataMap) {

	}
	getSchemaLength() {

	}
	getStringBits(data) {

	}
}
/*
export function generate(dataMap: DataMap, data: FormData): bitString {
	const output: bitString[] = [];

	for (let section of dataMap.form) {
		for (let row of section.rows) {
			const elements = Array.isArray(row) ? row : [row];
			for (let input of elements) {
				switch (input.type) {

				}
			}
		}
	}

}*/
