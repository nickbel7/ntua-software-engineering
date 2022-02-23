const express = require('../../backend/node_modules/express');
const router = express.Router();
const pool = require('../../backend/connect');

router.get('/', function(req, res) {
	pool.connect(function(err, client, release) {
		if(err) {
		        res.status(500).json({status:"failed", "dbconnection":"postgres://postgres:postgres@localhost:5432/diode"});
                        console.log("connection failed", err);
  		}
		else {
			res.status(200).json({status:"OK", "dbconnection":"postgres://postgres:postgres@localhost:5432/diode"});
                       	console.log("connection successful");
		}
		release();
	});
});

module.exports = router;
