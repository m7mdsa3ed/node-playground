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

		let value = Filesystem.get(cacheKeyFile);

		value = this._getValue(value);

		return value;
	}

	put(key, value) {
		key = this._getHashKey(key);

		const cacheKeyFile = path.join(cacheOptions.basePath, key);

		value = this._setValue(value);

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

	_setValue(value, options) {
		value = {
			value,
			type: typeof value,
			...options,
		};

		return JSON.stringify(value);
	}

	_getValue(value) {
		value = JSON.parse(value);

		return value.value;
	}
};
