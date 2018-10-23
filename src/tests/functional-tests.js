const chaiHttp = require("chai-http"),
	chai = require("chai"),
	assert = chai.assert,
	app = require(`${process.cwd()}/app`);

chai.use(chaiHttp);

suite("Functional Tests", () => {
	suite("Routing Tests", () => {
		suite("GET /api/convert => conversion object", () => {
			test("Convert 10L (valid input)", done => {
				chai
					.request(app)
					.get("/api/convert")
					.query({ input: "10L" })
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 10);
						assert.equal(res.body.initUnit, "L");
						assert.approximately(res.body.returnNum, 2.64172, 0.1);
						assert.equal(res.body.returnUnit, "gal");
						done();
					});
			});

			test("Convert 32g (invalid input unit)", done => {
				//done();
			});

			test("Convert 3/7.2/4kg (invalid number)", done => {
				//done();
			});

			test("Convert 3/7.2/4kilomegagram (invalid number and unit)", done => {
				//done();
			});

			test("Convert kg (no number)", done => {
				//done();
			});
		});
	});
});
