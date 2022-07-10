const express = require("express");
const Cache = require("../libs/Cache");
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
	Cache.put("name", "Moahmed");

	res.send({
		data: {
			message: Cache.get("name"),
		},
	});
});

module.exports = router;
