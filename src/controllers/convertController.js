const expr = require("expr-eval").Parser;

const units = {
	gal: { returnUnit: "L", spelling: "gallons" },
	L: { returnUnit: "gal", spelling: "litres" },
	mi: { returnUnit: "km", spelling: "miles" },
	km: { returnUnit: "mi", spelling: "kilometers" },
	lbs: { returnUnit: "kg", spelling: "pounds" },
	kg: { returnUnit: "lbs", spelling: "kilograms" }
};

function getNum(input) {
	let result = false;

	if (input.match(/\//g) == null || input.match(/\//g).length == 1) {
		let data = input.match(/[\d\.\/]+/);
		try {
			result = data != null ? expr.evaluate(data[0]) : 1;
		} catch (e) {
			console.log("Expression evaluated to an error.");
		}
	}

	return result;
}

function getUnit(input) {
	let data = input.match(/[a-zA-Z]+/);

	return data != null && units[data[0]] != null ? data[0] : false;
}

function getReturnUnit(input) {
	return units[input].returnUnit;
}

function spellOutUnit(input) {
	return units[input].spelling;
}

function convert(num, unit) {
	return new Promise((resolve, reject) => {
		let data,
			invalidNum = false,
			invalidUnit = false;

		if (!num) {
			invalidNum = true;
		}

		switch (unit) {
			case "gal":
				data = expr.evaluate(`${num}/0.26417`).toFixed(5);
				break;
			case "L":
				data = expr.evaluate(`${num}*.26417`).toFixed(5);
				break;
			case "mi":
				data = expr.evaluate(`${num}/.62137`).toFixed(5);
				break;
			case "km":
				data = expr.evaluate(`${num}*.62137`).toFixed(5);
				break;
			case "lbs":
				data = expr.evaluate(`${num}/2.2046`).toFixed(5);
				break;
			case "kg":
				data = expr.evaluate(`${num}*2.2046`).toFixed(5);
				break;
			default:
				invalidUnit = true;
				break;
		}

		if (invalidNum && invalidUnit) {
			reject("Invalid number and unit");
		} else if (invalidNum && !invalidUnit) {
			reject("Invalid number");
		} else if (!invalidNum && invalidUnit) {
			reject("Invalid unit");
		}

		resolve(data);
	});
}

exports.doConvert = (req, res) => {
	let num = getNum(req.query.input),
		unit = getUnit(req.query.input);

	convert(num, unit)
		.then(result => {
			let returnUnit = getReturnUnit(unit);
			return res.json({
				initNum: parseFloat(num),
				initUnit: unit,
				returnNum: parseFloat(result),
				returnUnit: returnUnit,
				string: `${num} ${unit} converts to ${result} ${returnUnit}`
			});
		})
		.catch(err => {
			return res.json({ error: err });
		});
};

exports.getNum = getNum;
exports.getUnit = getUnit;
exports.getReturnUnit = getReturnUnit;
exports.spellOutUnit = spellOutUnit;
exports.convert = convert;