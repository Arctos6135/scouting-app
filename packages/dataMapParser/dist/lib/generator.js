function getDataSchema(dataMap) {
    const schema = {};
    for (let section of 'form' in dataMap ? dataMap.form : [dataMap]) {
        for (let row of section.rows) {
            if (Array.isArray(row))
                for (let el of row)
                    schema[el.id] = el;
            else
                schema[row.id] = row;
        }
    }
    return schema;
}
/**
 * @returns A list of binary encodings for each pointer level
 * */
function getBits(id, data, dataSchema, repeatable = false) {
    if (dataSchema[id].type == 'text') {
        let textLength = BigInt(data[id].toString().length);
        let textValue = 0n;
        let currentPower = 1n;
        for (let i = 0; i < data[id].toString().length; i++) {
            const char = data[id].toString()[i].charCodeAt(0);
            const idx = dataSchema[id].allowedChars.indexOf(char);
            if (idx == -1)
                throw new RangeError(char + ' is not an allowed character for text input ' + id);
            textValue += currentPower * idx;
            currentPower *= dataSchema[id].allowedChars.length;
        }
        let maxTextValue = BigInt(dataSchema[id].allowedChars.length) ** textLength;
        return [
            { value: textLength, maxValue: BigInt(dataSchema[id].maxLength) },
            { value: textValue, maxValue: maxTextValue }
        ];
    }
    else if (dataSchema[id].type == 'number') {
    }
    else {
        const _exhaustiveCheck = dataSchema[id].type;
        return _exhaustiveCheck;
    }
}
export class BitSchema {
    constructor(dataMap) {
        this.dataMap = dataMap;
        this.schema = [];
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
