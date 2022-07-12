const path = require("path");

const configs = {
	basename: "./configs/",
	configFilePrefix: ".config.js",
};

const normalizedPath = path.join(configs.basename);

class Config {
	constructor() {
		const appConfigs = {};

		require("fs")
			.readdirSync(normalizedPath)
			.filter((file) => file.includes(configs.configFilePrefix))
			.forEach(function (file) {
				const configName = file.replace(configs.configFilePrefix, "");

				const configFilePath = path.resolve(configs.basename) + "\\" + file;

				const configContent = require(configFilePath);

				appConfigs[configName] = configContent;
			});

		this.configs = appConfigs;
	}

	all() {
		return this.configs;
	}

	get(path) {
		var getter = new Function("obj", "return obj." + path + ";");
		return getter(this.configs);
	}

	set(path, value) {
		const newObject = JSON.parse(
			JSON.stringify(this._stringToObject(path, value))
		);

		const updatedConfigs = this._mergeDeep(this.configs, newObject);

		this.configs = updatedConfigs;
	}

	_stringToObject(path, value) {
		if (!Array.isArray(path)) {
			path = path.split(".");
		}
		if (!path.length) {
			return value;
		}
		return {
			[path.shift()]: this._stringToObject(path, value),
		};
	}

	_mergeDeep(...objects) {
		const isObject = (obj) => obj && typeof obj === "object";

		return objects.reduce((prev, obj) => {
			Object.keys(obj).forEach((key) => {
				const pVal = prev[key];
				const oVal = obj[key];

				if (Array.isArray(pVal) && Array.isArray(oVal)) {
					prev[key] = pVal.concat(...oVal);
				} else if (isObject(pVal) && isObject(oVal)) {
					prev[key] = this._mergeDeep(pVal, oVal);
				} else {
					prev[key] = oVal;
				}
			});

			return prev;
		}, {});
	}

	has(path) {
		return !!this.get(path);
	}
}

module.exports = new Config();
