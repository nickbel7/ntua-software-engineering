const express = require('express')
const router = express.Router();
const client = require('./connection.js');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

client.connect();
router.get('/:station_id/:date_from/:date_to', async (req,res) => {
	var currentdate = new Date(); 
	var timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	const { station_id,date_from,date_to } = req.params;
	try {
	const find_provider = await client.query("Select distinct providers.provider_name FROM stations NATURAL JOIN providers WHERE stations.station_id=$1",[station_id]);
	const result = await client.query("SELECT ROW_NUMBER() OVER(ORDER BY pass_timestamp ASC) AS PassIndex,passes.pass_id AS PassID, passes.pass_timestamp AS PassTimeStamp, tags.vehicle_id AS VehicleID, providers.provider_name as TagProvider, passes.pass_rate AS PassCharge FROM passes INNER JOIN tags USING (tag_id) INNER JOIN providers USING (provider_id) WHERE station_id=$1 and pass_timestamp between $2 and $3",[station_id,date_from,date_to]);
	const response = {
		"Station":station_id,
		"StationOperator":find_provider.rows[0].provider_name,
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
 
 	client.end;
});
module.exports = router;
