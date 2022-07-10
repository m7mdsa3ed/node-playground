const fs = require("fs");
const path = require("path");

module.exports = class Filesystem {
	static get(path) {
		return fs.readFileSync(path, "utf8");
	}

	static put(path, content) {
		this.createDirIfNotExists(path);

		fs.writeFileSync(path, content);
	}

	static remove(path) {
		fs.unlink(path);
	}

	static move(oldPath, newPath) {
		const targetPathDirname = path.dirname(newPath);

		this.createDir(targetPathDirname);

		fs.rename(oldPath, newPath, (err) => console.log({ err }));

		return newPath;
	}

	static createDirIfNotExists(targetPath) {
		const dirname = path.dirname(targetPath);

		if (!fs.existsSync(dirname)) {
			fs.mkdirSync(targetPath, { recursive: true });
		}
	}
};
