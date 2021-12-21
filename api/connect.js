const { Client } = require('pg');

module.exports.dbconnect = async () => {
  	const client = new Client({
		host: "localhost",
    		port: 5432,
    		user: "postgres",
    		password: "postgres",
    		database: "diode",
  	});
  	await client.connect();
  	return client;
};
