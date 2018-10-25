const chai = require("chai"),
	assert = chai.assert,
	convertController = require("../controllers/convertController");

suite("Unit Tests", () => {
	suite("Function convertController.getNum(input)", () => {
		test("Whole number input", done => {
			let input = "33L";
			assert.equal(convertController.getNum(input), "33");
			done();
		});

		test("Decimal Input", done => {
			let input = "3.1415";
			assert.equal(convertController.getNum(input), "3.1415");
			done();
		});

		test("Fractional Input", done => {
			let input = "32/4";
			assert.equal(convertController.getNum(input), "8");
			done();
		});

		test("Fractional Input w/ Decimal", done => {
			let input = "22.2/2";
			assert.equal(convertController.getNum(input), "11.1");
			done();
		});

		test("Invalid Input (double fraction)", done => {
			let input = "11/2/2/11";
			assert.isNotOk(convertController.getNum(input), "Bad input");
			done();
		});

		test("No Numerical Input", done => {
			let input = "test";
			assert.equal(convertController.getNum(input), "1");
			done();
		});
	});

	suite("Function convertHandler.getUnit(input)", () => {
		test("For Each Valid Unit Inputs", done => {
			let input = ["gal", "L", "mi", "km", "lbs", "kg"];
			input.forEach(item => {
				assert.isOk(
					convertController.getUnit(item),
					"Provided unit is correct"
				);
			});
			done();
		});

		test("Unknown Unit Input", done => {
			let input = ["test", "TEST", "gals", "LBSLBS", "LLL", " m"];
			input.forEach(item => {
				assert.isNotOk(
					convertController.getUnit(item),
					"Provided unit is not correct"
				);
			});
			done();
		});
	});

	suite("Function convertController.getReturnUnit(initUnit)", () => {
		test("For Each Valid Unit Inputs", done => {
			let input = ["gal", "L", "mi", "km", "lbs", "kg"];
			let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
			input.forEach((item, index) => {
				assert.equal(convertController.getReturnUnit(item), expect[index]);
			});
			done();
		});
	});

	suite("Function convertHandler.spellOutUnit(unit)", () => {
		test("For Each Valid Unit Inputs", done => {
			let input = ["gal", "L", "mi", "km", "lbs", "kg"];
			let expect = [
				"gallons",
				"litres",
				"miles",
				"kilometers",
				"pounds",
				"kilograms"
			];
			input.forEach((item, index) => {
				assert.equal(convertController.spellOutUnit(item), expect[index]);
			});
			done();
		});
	});

	suite("Function convertHandler.convert(num, unit, (err, res))", () => {
		test("Gal to L", done => {
			let input = [5, "gal"];
			let expected = 18.9271;

			convertController.convert(input[0], input[1], (err, res) => {
				assert.approximately(
					parseFloat(res),
					expected,
					0.1 //tolerance
				);
			});

			done();
		});

		test("L to Gal", done => {
			let input = [5, "L"];
			let expected = 1.32085;
			convertController.convert(input[0], input[1], (err, res) => {
				assert.approximately(parseFloat(res), expected, 0.1);
			});
			done();
		});

		test("Mi to Km", done => {
			let input = [5, "mi"];
			let expected = 8.04673;
			convertController.convert(input[0], input[1], (err, res) => {
				assert.approximately(parseFloat(res), expected, 0.1);
			});
			done();
		});

		test("Km to Mi", done => {
			let input = [5, "km"];
			let expected = 3.10685;
			convertController.convert(input[0], input[1], (err, res) => {
				assert.approximately(parseFloat(res), expected, 0.1);
			});
			done();
		});

		test("Lbs to Kg", done => {
			let input = [5, "lbs"];
			let expected = 2.26798;
			convertController.convert(input[0], input[1], (err, res) => {
				assert.approximately(parseFloat(res), expected, 0.1);
			});
			done();
		});

		test("Kg to Lbs", done => {
			let input = [5, "kg"];
			let expected = 11.023;
			convertController.convert(input[0], input[1], (err, res) => {
				assert.approximately(parseFloat(res), expected, 0.1);
			});
			done();
		});
	});
});
