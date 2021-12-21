const express = require('express');
const { dbconnect } = require('/home/konsi/Desktop/api/connect.js');
const router = express.Router();

router.post('/', (req,res) => {
	(async () => {
  		const client = await dbconnect();
		await client.query("TRUNCATE TABLE passes", (err) => {
        		if (err == undefined) {
				res.json({status:"OK"});
				console.log("table passes truncated");
			}
			else {
				res.json({status:"failed"});
				console.log("table passes not truncated", err);
			}
		});
	})();
});

module.exports = router;
