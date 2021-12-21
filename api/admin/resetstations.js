const express = require('express');
const { dbconnect } = require('/home/konsi/Desktop/api/connect.js');
const fs = require('fs');
const router = express.Router();

var sql = fs.readFileSync('stations.sql').toString();

router.post('/', (req,res) => {
	(async () => {
                const client = await dbconnect();
                await client.query("TRUNCATE TABLE stations CASCADE", (err1) => {
			if (err1 == undefined) {
				client.query(sql, (err2) => {
                                if (err2 == undefined) {
                                        res.json({status:"OK"});
                                        console.log("table stations reset");
                                }
                                else {
                                        res.json({status:"failed"}).send(err2);
                                        console.log("table stations truncated", err2);
                                }
                        	});			
                        }
                        else {
                                res.json({status:"failed"}).send(err1);
                                console.log("table stations not truncated", err1);
                        }
		});
        })();
});

module.exports = router;
