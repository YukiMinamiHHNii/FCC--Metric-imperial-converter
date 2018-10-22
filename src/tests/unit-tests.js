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
			let input = [
				"gal",
				"l",
				"mi",
				"km",
				"lbs",
				"kg",
				"GAL",
				"L",
				"MI",
				"KM",
				"LBS",
				"KG"
			];
			input.forEach(item=> {
				assert.isOk(convertController.getUnit(item), 'Provided unit is correct');
			});
			done();
		});

		test("Unknown Unit Input", done => {
			let input=['test', 'TEST', 'gals', 'LBSLBS', 'LLL', ' m'];
			input.forEach(item=>{
				assert.isNotOk(convertController.getUnit(item), 'Provided unit is not correct');
			})
			done();
		});
	});

	/*suite("Function convertController.getReturnUnit(initUnit)", () => {
		test("For Each Valid Unit Inputs", done => {
			let input = ["gal", "l", "mi", "km", "lbs", "kg"];
			let expect = ["l", "gal", "km", "mi", "kg", "lbs"];
			input.forEach((item, index)=> {
				assert.equal(convertController.getReturnUnit(item), expect[index]);
			});
			done();
		});
	});

	suite("Function convertHandler.spellOutUnit(unit)", () => {
		test("For Each Valid Unit Inputs", done => {
			//see above example for hint
			done();
		});
	});

	suite("Function convertHandler.convert(num, unit)", () => {
		test("Gal to L", done => {
			let input = [5, "gal"];
			let expected = 18.9271;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1
			); //0.1 tolerance
			done();
		});

		test("L to Gal", done => {
			//done();
		});

		test("Mi to Km", done => {
			//done();
		});

		test("Km to Mi", done => {
			//done();
		});

		test("Lbs to Kg", done => {
			//done();
		});

		test("Kg to Lbs", done => {
			//done();
		});
	});*/
});
