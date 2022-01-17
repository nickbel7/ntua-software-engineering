const pg = require('pg');
require('dotenv').config();

const config = {
  	user: "postgres",
	host: "localhost",
  	database: "diode",
  	password: "postgres",
  	port: 5432,
}

const pool = new pg.Pool(config);
module.exports = pool;
