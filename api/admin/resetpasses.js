const express = require('express');
const router = express.Router();
const pool = require('../connect.js');

router.post('/', function(req, res) {
	pool.connect(function(err, client) {
		if(err) {
                	res.status(500).json({status:"failed"});
                     	console.log("connection failed", err);
             	}
		client.query("TRUNCATE TABLE passes", function(err) {
        		if(err) {
				res.status(500).json({status:"failed"});
                                console.log("table passes not truncated", err);
			}
			else {
				res.status(200).json({status:"OK"});
                                console.log("table passes truncated");
			}
		});
	});
});

module.exports = router;
