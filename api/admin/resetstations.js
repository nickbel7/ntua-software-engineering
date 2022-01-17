const express = require('express');
const router = express.Router();
const fs = require('fs');
const pool = require('../connect.js');

var sql = fs.readFileSync('./admin/stations.sql').toString();

router.post('/', function(req, res) {
	pool.connect(function(err, client) {
		if(err) {
                        res.status(500).json({status:"failed"});
                        console.log("connection failed", err);
                }
        	client.query("TRUNCATE TABLE stations CASCADE", function(err) {
			if(err) {
				res.status(500).json({status:"failed"});
                                console.log("table stations not truncated", err);
                        }
                        else {
                                client.query(sql, function(err) {
                                	if (err) {
						res.status(500).json({status:"failed"});
                                        	console.log("table stations truncated not reset", err);
                                	}
                                	else {
						res.status(200).json({status:"OK"});
                                        	console.log("table stations reset");
                                	}
                                });
                        }
		});
	});
});

module.exports = router;
