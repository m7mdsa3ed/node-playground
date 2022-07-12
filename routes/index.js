const express = require("express");
const Config = require("../libs/Config");
const Filesystem = require("../libs/Filesystem");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/upload", (req, res, next) => {
	const fileUpload =
		req.files[req.files.findIndex((file) => file.fieldname == "file")];

	const targetPath = `./storage/uploads/${fileUpload.originalname}`;

	Filesystem.move(fileUpload.path, targetPath);

	res.redirect("/");
});

router.get("/t", function (req, res, next) {
	res.send(Config.all());
});

module.exports = router;
