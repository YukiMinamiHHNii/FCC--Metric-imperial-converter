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
				chai
					.request(app)
					.get("/api/convert")
					.query({ input: "32g" })
					.end((err, res) => {
						assert.equal(res.body.error, "Invalid unit");
						done();
					});
			});

			test("Convert 3/7.2/4kg (invalid number)", done => {
				chai
					.request(app)
					.get("/api/convert")
					.query({ input: "3/7.2/4kg" })
					.end((err, res) => {
						assert.equal(res.body.error, "Invalid number");
						done();
					});
			});

			test("Convert 3/7.2/4kilomegagram (invalid number and unit)", done => {
				chai
					.request(app)
					.get("/api/convert")
					.query({ input: "3/7.2/4kilomegagram" })
					.end((err, res) => {
						assert.equal(res.body.error, "Invalid number and unit");
						done();
					});
			});

			test("Convert kg (no number)", done => {
				chai
					.request(app)
					.get("/api/convert")
					.query({ input: "kg" })
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 1);
						assert.equal(res.body.initUnit, "kg");
						assert.approximately(res.body.returnNum, 2.2046, 0.1);
						assert.equal(res.body.returnUnit, "lbs");
						done();
					});
			});
		});
	});
});
