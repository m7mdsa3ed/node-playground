const path = require("path");
const Filesystem = require("../../Filesystem");
const crypto = require("crypto");

const cacheOptions = {
	basePath: "./storage/cache/",
	hash: true,
	ttl: 60,
};

module.exports = class FileCacheDriver {
	get(key) {
		key = this._getHashKey(key);

		const cacheKeyFile = path.join(cacheOptions.basePath, key);

		const value = Filesystem.get(cacheKeyFile);

		return value;
	}

	put(key, value, ttl) {
		key = this._getHashKey(key);

		const cacheKeyFile = path.join(cacheOptions.basePath, key);

		Filesystem.put(cacheKeyFile, value);
	}

	forget(key) {
		key = this._getHashKey(key);

		const cacheKeyFile = path.join(cacheOptions.basePath, key);

		Filesystem.remove(cacheKeyFile);
	}

	_getHashKey(key) {
		if (cacheOptions.hash === true) {
			key = crypto.createHash("md5").update(key).digest("hex");
		}

		return key;
	}
};
