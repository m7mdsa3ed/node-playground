const express = require("express");
const Mail = require("../libs/Mail");
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

router.get("/t", async function (req, res, next) {
	const SendTestEmail = require("../mails/SendTestEmail");

	Mail.to("m7md.sa3ed@hotmail.com").send(new SendTestEmail("Subject"));

	res.json({
		message: "Email Sent ",
	});
});

module.exports = router;
