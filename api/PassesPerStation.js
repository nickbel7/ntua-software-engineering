const express = require('express')
const router = express.Router();
const client = require('./connection.js');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

client.connect();
router.get('/:station_id/:date_from/:date_to', async (req,res) => {
	const { station_id,date_from,date_to } = req.params;
	try {
	const result = await client.query("Select passes.pass_id, passes.pass_timestamp, tags.vehicle_id, tags.provider_id, passes.pass_rate FROM tags INNER JOIN providers USING (provider_id) INNER JOIN stations USING (provider_id) INNER JOIN passes USING (station_id) where station_id=$1 and pass_timestamp between $2 and $3",[station_id,date_from,date_to]);
	console.log(station_id, date_from, date_to);
	const response = {
		Station:station_id,
		PeriodFrom:date_from,
		PeriodTo:date_to,
		PassesList:result.rows,
	}
	res.json(response);
	}
	catch (err) {
		console.log(err);
	}
 
 	client.end;
});
module.exports = router;
