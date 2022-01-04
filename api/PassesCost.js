const express = require('express')
const router = express.Router();
const client = require('./connection.js');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

client.connect();
router.get('/:op1_ID/:op2_ID/:date_from/:date_to', async (req,res) => {
	var currentdate = new Date(); 
	var timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	const { op1_ID,op2_ID,date_from,date_to } = req.params;
	try {
	const result_count = await client.query("SELECT COUNT(*) AS count  FROM passes INNER JOIN stations USING (station_id) INNER JOIN tags USING (tag_id) WHERE stations.provider_id=$1 AND tags.provider_id=$2 AND passes.pass_timestamp BETWEEN $3 AND $4",[op1_ID,op2_ID,date_from,date_to]);
	const result_charge = await client.query("SELECT SUM(pass_rate) passes_cost FROM passes INNER JOIN stations USING (station_id) INNER JOIN tags USING (tag_id) WHERE stations.provider_id=$1 AND tags.provider_id=$2 AND passes.pass_timestamp BETWEEN $3 AND $4",[op1_ID,op2_ID,date_from,date_to]);
	const response = {
		"op1_ID":op1_ID,
		"op2_ID":op2_ID,
		"RequestTimestamp":timestamp,
		"PeriodFrom":date_from,
		"PeriodTo":date_to,
		"NumberOfPasses":result_count.rows[0].count,
		"PassesCost":result_charge.rows[0].passes_cost,
	}
	res.json(response);
	}
	catch (err) {
		console.log(err);
	}
 
 	client.end;
});
module.exports = router;
