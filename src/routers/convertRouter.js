const express = require("express"),
	router = express.Router(),
	convertController = require("../controllers/convertController");

router.get("/convert", convertController.doConvert);

module.exports = router;
