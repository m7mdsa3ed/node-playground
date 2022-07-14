const nodemailer = require("nodemailer");
const Config = require("../../Config");

class SmtpTransporter {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: Config.get("mail.drivers.smtp.host"),
			port: Config.get("mail.drivers.smtp.port"),
			secure: Config.get("mail.drivers.smtp.encryption") == "ssl",
			auth: {
				user: Config.get("mail.drivers.smtp.username"),
				pass: Config.get("mail.drivers.smtp.password"),
			},
		});
	}

	async send(message) {
		const response = await this.transporter.sendMail({
			from: message.from,
			to: message.to,
			subject: message.subject,
			text: message.text,
			html: message.html,
		});

		return response;
	}
}

module.exports = new SmtpTransporter();
