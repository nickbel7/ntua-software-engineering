const pg = require('pg');
require('dotenv').config();

const config = {
  	user: "postgres",
	host: "localhost",
  	database: "diode",
  	password: "postgres",
  	port: 5432,
	idleTimeoutMillis: 30000,
  	connectionTimeoutMillis: 2000,
}

const pool = new pg.Pool(config);
module.exports = pool;
