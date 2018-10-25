const express = require("express"),
	bodyParser = require("body-parser"),
	dotenv = require("dotenv").load(),
	helmet = require("helmet"),
	convertRouter = require("./src/routers/convertRouter");

const app = express();
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index");
});

app.use("/api", convertRouter);

app.use((req, res) => {
	res
		.status(404)
		.type("text")
		.send("Not found (will improve this later :v)");
});

app.listen(process.env.SERVER_PORT);
console.log(`App listening on port ${process.env.SERVER_PORT}`);

module.exports= app;