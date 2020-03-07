const config = {
	app: {
		port: process.env.APP_PORT,
		env: process.env.APP_ENV
	},
	services: {
		hostname: process.env.DEV_SERVICE_HOSTNAME,
		port: process.env.DEV_SERVICE_PORT,
		type: process.env.DEV_SERVICE_TYPE
	}, 
	mongo: {
		host: process.env.DEV_MONGO_HOST,
		port: process.env.DEV_MONGO_PORT,
		db: process.env.DEV_MONGO_DB,
		user: process.env.DEV_MONGO_USER,
		pass: process.env.DEV_MONGO_PASS
	}
};

module.exports = config;