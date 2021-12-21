const express = require('express');
const router = express.Router();
const { dbconnect } = require('/home/konsi/Desktop/api/connect.js');

router.get('/', (req,res) => {
	(async () => {
                const client = await dbconnect();
                if (client != undefined) {
                     	res.json({status:"OK", "dbconnection":"postgres://postgres:postgres@localhost:5432/diode"});
                       	console.log("connection successful");
                }
                else {
                	res.json({status:"failed", "dbconnection":"postgres://postgres:postgres@localhost:5432/diode"});
                        console.log("connection failed");
              	}
        })();
});

module.exports = router;
