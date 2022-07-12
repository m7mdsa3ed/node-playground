module.exports = {
	defaultDriver: "smtp",

	drivers: {
		smtp: {
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			username: process.env.MAIL_USERNAME,
			password: process.env.MAIL_PASSWORD,
			encryption: process.env.MAIL_ENCRYPTION,
		},
	},

	fromName: process.env.MAIL_FROM_NAME,
	fromAddress: process.env.MAIL_FROM_ADDRESS,
};
