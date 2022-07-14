module.exports = class {
	constructor(subject) {
		this.subject = subject;
	}

	handle() {
		this.body = "Hello World";

		return this;
	}
};
