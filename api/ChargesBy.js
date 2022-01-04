const express = require('express')
const router = express.Router();
const client = require('./connection.js');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

client.connect();
router.get('/:op_ID/:date_from/:date_to', async (req,res) => {
	var currentdate = new Date(); 
	var timestamp = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	const { op_ID,date_from,date_to }= req.params;
	try {
	const result = await client.query('SELECT "Tags"."ProviderID",COUNT(*) as count, SUM("Passes"."Rate") AS "PassesCost" FROM "Passes" INNER JOIN "Stations" USING ("StationID") INNER JOIN "Tags" USING ("TagID") WHERE "Stations"."ProviderID"=$1 AND "Passes"."Type" LIKE' + "'away%'"+'AND "Timestamp" BETWEEN $2 AND $3 GROUP BY "Tags"."ProviderID"',[op_ID,date_from,date_to]);
	const response = {
		"op_ID":op_ID,
		"RequestTimestamp":timestamp,
		"PeriodFrom":date_from,
		"PeriodTo":date_to,
		"PPOList":result.rows
	}
	res.json(response);
	}
	catch (err) {
		console.log(err);
	}
 
 	client.end;
});
module.exports = router;
