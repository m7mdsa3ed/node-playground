const Config = require("../Config");
const path = require("path");

class Mail {
	constructor() {
		const transporters = this._getTransporters();

		const defaultTransporter = Config.get("mail.defaultDriver");

		this.transporter = transporters[defaultTransporter];
	}

	to(mail) {
		this.toMail = mail;

		return this;
	}

	async send(mailable) {
		const message = this._createMessage(mailable);

		const transporter = this.transporter;

		const results = await transporter.send(message);

		console.log({ results });
	}

	_createMessage(mailable) {
		mailable.handle();

		return {
			to: this.toMail,
			from: Config.get("mail.fromAddress"),
			html: mailable.body,
			subject: mailable.subject,
		};
	}

	_getTransporters() {
		const relativePath = "./libs/Mail/Transporters";
		const normalizedPath = path.join(relativePath);
		const configFilePrefix = "Transporter.js";
		const transporters = [];

		require("fs")
			.readdirSync(normalizedPath)
			.filter((file) => file.includes(configFilePrefix))
			.forEach(function (file) {
				const configName = file.replace(configFilePrefix, "").toLowerCase();

				const configFilePath = path.resolve(relativePath) + "\\" + file;

				const configContent = require(configFilePath);

				transporters[configName] = configContent;
			});

		return transporters;
	}
}

module.exports = new Mail();
