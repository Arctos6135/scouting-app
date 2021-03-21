import { describe, it } from "mocha";
import { expect } from "chai";

import * as components from "@components";

describe('Form Components', function() {
	describe("Text component", function() {
		it('should be able to exactly recreate the inputs', function() {
			const component = new components.TextComponent(32, "0123456789");
			
			for (let i = 0; i < 100000; i++) {
				const random = Math.floor(Math.random() * 10e16).toString();
				const encoded = component.encodeValue(random);
				const decoded = component.decodeValue(encoded.encoded);
				expect(decoded.data).to.equal(random);
				expect(decoded.size).to.equal(encoded.size);
			}
		});
	});

	describe("Section components", function () {
		it('should accurately recreate multiple inputs', function() {
			const txt1 = new components.TextComponent(32, "0123456789");
			const num1 = new components.NumberComponent([1, 11], 10);
			const component = new components.SectionComponent([txt1, num1]);

			for (let i = 0; i < 100000; i++) {
				const randomText = Math.floor(Math.random() * 10e16).toString();
				const randomNum = Math.floor(Math.random() * 10 + 1).toString();

				const encoded = component.encodeValue([randomText, randomNum]);
				const decoded = component.decodeValue(encoded.encoded);
				
				expect(decoded.data).to.deep.equal([randomText, randomNum]);
				expect(encoded.size).to.equal(decoded.size);
			}

		});
	});

});
