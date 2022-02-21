const express = require('../../backend/node_modules/express');
const router = express.Router();
const fs = require('fs');
const pool = require('../../backend/connect');

var sql = fs.readFileSync('../database/DATA-DUMP/WITH_SQL/tags.sql').toString();

router.post('/', function(req, res) {
        pool.connect(function(err, client) {
		if(err) {
                        res.status(500).json({status:"failed"});
                        console.log("connection failed", err);
                }
                client.query("TRUNCATE TABLE tags CASCADE", function(err) 
                {
                        if (err) {
				res.status(500).json({status:"failed"});
                                console.log("table tags(vehicles) not truncated", err);
                        }
                        else {
				client.query(sql, function(err) {
                                	if (err) {
						res.status(500).json({status:"failed"});
                                                console.log("table tags(vehicles) truncated", err);
                                	}
                                	else {
						res.status(200).json({status:"OK"});
                                                console.log("table tags(vehicles) reset");
                                	}
                                });
                        }
                });
        });
});

module.exports = router;
