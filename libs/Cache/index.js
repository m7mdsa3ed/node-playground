const driverList = require("./Drivers");

class Cache {
	constructor() {
		this.driver = process.env.CACHE_DRIVER;

		return new Proxy(this, {
			get(target, property) {
				if (target[property]) {
					return target[property];
				}

				let driverName = target.driver;

				driverName = driverName.charAt(0).toUpperCase() + driverName.slice(1);

				const driverInstanceName = `${driverName}CacheDriver`;

				const driverInstance = new driverList[driverInstanceName]();

				const driverProperty = driverInstance[property];

				if (driverProperty) {
					return driverProperty;
				}
			},
		});
	}
}

module.exports = new Cache();
