const fs = require("fs");
const path = require("path");

class Filesystem {
	constructor() {
		return new Proxy(this, {
			get: (_this, prop) => {
				if (_this[prop]) {
					return _this[prop];
				}

				// Fallback to bult-in fs
				return fs[prop];
			},
		});
	}

	get(path) {
		return fs.readFileSync(path, "utf8");
	}

	put(path, content) {
		this.createDirIfNotExists(path);

		fs.writeFileSync(path, content);
	}

	remove(path) {
		fs.unlink(path);
	}

	move(oldPath, newPath) {
		const targetPathDirname = path.dirname(newPath);

		this.createDir(targetPathDirname);

		fs.rename(oldPath, newPath, (err) => console.log({ err }));

		return newPath;
	}

	createDirIfNotExists(targetPath) {
		const dirname = path.dirname(targetPath);

		if (!fs.existsSync(dirname)) {
			fs.mkdirSync(targetPath, { recursive: true });
		}
	}
}

module.exports = new Filesystem();
