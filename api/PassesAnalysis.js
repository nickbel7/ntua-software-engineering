const express = require('express')
const router = express.Router();
const client2 = require('./connection.js');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

client2.connect();
router.get('/:op1_ID/:op2_ID/:date_from/:date_to', async (req,res) => {
	var currentdate = new Date(); 
	var timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	const { op1_ID,op2_ID,date_from,date_to }= req.params;
	try {
	const result = await client2.query("SELECT ROW_NUMBER() OVER(ORDER BY pass_timestamp ASC) AS PassIndex, passes.pass_id AS PassID, passes.station_id AS StationID, pass_timestamp AS TimeStamp, tags.vehicle_id AS VehicleID, pass_rate AS Charge FROM passes INNER JOIN stations USING (station_id) INNER JOIN tags USING (tag_id) WHERE stations.provider_id=$1 AND tags.provider_id=$2 AND passes.pass_timestamp BETWEEN $3 AND $4",[op1_ID,op2_ID,date_from,date_to]);
	const response = {
		"op1_ID":op1_ID,
		"op2_ID":op2_ID,
		"RequestTimestamp":timestamp,
		"PeriodFrom":date_from,
		"PeriodTo":date_to,
		"NumberOfPasses":result.rows.length,
		"PassesList":result.rows,
	}
	res.json(response);
	}
	catch (err) {
		console.log(err);
	}
 
 	client2.end;
});
module.exports = router;
