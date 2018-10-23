const expr = require("expr-eval").Parser;

const units = {
	gal: { returnUnit: "l", spelling: "gallons" },
	l: { returnUnit: "gal", spelling: "litres" },
	mi: { returnUnit: "km", spelling: "miles" },
	km: { returnUnit: "mi", spelling: "kilometers" },
	lbs: { returnUnit: "kg", spelling: "pounds" },
	kg: { returnUnit: "lbs", spelling: "kilograms" }
};

exports.getNum = input => {
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
};

exports.getUnit = input => {
	let data = input.match(/[a-zA-Z]*/);

	return data != null && units[data[0].toLowerCase()] != null ? data : false;
};

exports.getReturnUnit = input => {
	return units[input].returnUnit;
};

exports.spellOutUnit = input => {
	return units[input].spelling;
};

exports.convert = (value, unit, result) => {
	let data;

	if (!value) {
		data="Invalid number";
	} else {
		switch (unit) {
			case "gal":
				data= expr.evaluate(`${value}/0.26417`).toFixed(5);
				break;
			case "l":
			data= expr.evaluate(`${value}*.26417`).toFixed(5);
				break;
			case "mi":
			data= expr.evaluate(`${value}/.62137`).toFixed(5);
				break;
			case "km":
			data= expr.evaluate(`${value}*.62137`).toFixed(5);
				break;
			case "lbs":
			data= expr.evaluate(`${value}/2.2046`).toFixed(5);
				break;
			case "kg":
			data= expr.evaluate(`${value}*2.2046`).toFixed(5);
				break;
			default:
			data= 'Invalid unit';
				break;
		}
	}
	return result(data);
};
