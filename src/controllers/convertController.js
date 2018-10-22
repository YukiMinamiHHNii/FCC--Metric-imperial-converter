const expr = require("expr-eval").Parser;

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

exports.getUnit = input => {};

exports.getReturnUnit = input => {};