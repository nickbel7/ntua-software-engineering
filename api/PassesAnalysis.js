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
	const result = await client2.query('SELECT ROW_NUMBER() OVER(ORDER BY "Timestamp" ASC) AS "PassIndex", "Passes"."PassID", "Passes"."StationID", "Timestamp" , "Tags"."VehicleCode" AS "VehicleID", "Rate" AS "Charge" FROM "Passes" INNER JOIN "Stations" USING ("StationID") INNER JOIN "Tags" USING ("TagID") WHERE "Stations"."ProviderID"=$1 AND "Tags"."ProviderID"=$2 AND "Passes"."Timestamp" BETWEEN $3 AND $4',[op1_ID,op2_ID,date_from,date_to]);
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
