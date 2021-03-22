import { describe, it } from "mocha";
import { expect } from "chai";

import * as crypto from "crypto";

import * as components from "@components";

import { Buffer } from 'buffer';
import { FormComponent, FormData } from "lib/formComponents/formComponent";

function getRandomData<T extends FormComponent>(comp: T): FormData {
	if (comp instanceof components.SectionComponent) {
		let out = []
		for (let sub of comp.subComponents) {
			out.push(getRandomData(sub));
		}
		return out;
	}
	else if (comp instanceof components.NumberComponent) {
		const rand = Math.floor(Math.random() * comp.steps) / comp.steps;
		return Math.floor(rand * (comp.range[1] - comp.range[0]) + comp.range[0]).toString();
	}
	else if (comp instanceof components.TextComponent) {
		let len = Math.floor(Math.random() * comp.maxLength);
		let out = '';
		for (let i = 0; i < len; i++) {
			out += Object.keys(comp.charValues)[Math.floor(Math.random() * Number(comp.base))];
		}
		return out;
	}
	else if (comp instanceof components.PickerComponent) {
		return comp.options[Math.floor(Math.random() * comp.options.length)];
	}

	return '';
}

describe('Form Components', function() {
	describe("Text component", function() {
		it('should be able to exactly recreate the inputs', function() {
			const component = new components.TextComponent(32, "0123456789");
			
			for (let i = 0; i < 100000; i++) {
				const random = getRandomData(component);
				const encoded = component.encodeValue(random);
				const decoded = component.decodeValue(encoded.encoded);
				expect(decoded.data).to.equal(random);
				expect(decoded.size).to.equal(encoded.size);
			}
		});
	});

	describe("Section components", function () {
		it('should accurately recreate multiple inputs', function() {
			this.timeout(10000);
			const component = new components.SectionComponent([
				new components.TextComponent(32, "0123456789"),
				new components.TextComponent(32, '01234556789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ=+/'),
				new components.NumberComponent([1, 11], 10),
				new components.NumberComponent([5, 25], 10),
				new components.SectionComponent([
					new components.TextComponent(16, '012356789abcdef'),
					new components.NumberComponent([5, 7], 1),
					new components.PickerComponent(['a', 'b', 'c', 'd']),
					new components.SectionComponent([
						new components.NumberComponent([100000, 900000], 1000),
						new components.TextComponent(64, 'abcdefghijklmnopqrstuvwxyz ')
					])
				]),
				new components.PickerComponent(['aa', 'bb', 'cc', 'dd']),
				new components.ToggleComponent(['off', 'on'])
			]);
			

			let dataSaved = 0;
			let dataUsed = 0;

			for (let i = 0; i < 10000; i++) {
				const data: FormData = getRandomData(component);

				const encoded = component.encodeValue(data);
				const decoded = component.decodeValue(encoded.encoded);
				
				expect(encoded.size > encoded.encoded, 'Size should be larger than data').to.be.true;
				expect(encoded.size, 'Size should be equal').to.equal(decoded.size);
				expect(decoded.data, 'Data should be equal').to.deep.equal(data);

				let compressed = Buffer.from(encoded.encoded.toString(16), 'hex').toString('base64');
				let json = Buffer.from(JSON.stringify(decoded.data)).toString('base64');
				dataSaved += json.length - compressed.length;
				dataUsed += json.length;
				console.log(json, compressed);
			}

			console.log((dataSaved / dataUsed * 100).toFixed(2) + '%', 'data size reduction');

		});
	});

});
