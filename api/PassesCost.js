const express = require('express')
const router = express.Router();
const pool = require('./connect.js');
const { parse } = require('json2csv');

router.get('/:op1_ID/:op2_ID/:date_from/:date_to', function(req, res) {
	const date = new Date();
    const req_timestamp = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds();
	const { op1_ID, op2_ID, date_from, date_to } = req.params;
	pool.connect(function(err, client) {
		if(err) {
			res.status(500).json({status:"failed"});
			console.log("connection failed", err);
		}

		client.query("SELECT COUNT(charge) AS total_passes, cast(SUM(charge) as DECIMAL(10,2)) AS total_charge FROM passes_transposed WHERE pass_type LIKE '%away%' AND provider1_id = $1 AND provider2_id = $2 AND pass_time BETWEEN $3 AND $4", [op1_ID, op2_ID, date_from, date_to], function(err, result) 
		{
			if(err) {
				res.status(400).json({status:"failed"});
				console.log("Passes cost query bad request", err);
			}
			else if(!result.rows.length) {
				res.status(402).json({status:"failed"});
				console.log("Passes cost query no data");
			}
			else {
				const response = {
					"op1_ID":op1_ID,
					"op2_ID":op2_ID,
					"RequestTimestamp":req_timestamp,
					"PeriodFrom":date_from,
					"PeriodTo":date_to,
					"NumberOfPasses":result.rows[0].total_passes,
					"PassesCost":result.rows[0].total_charge,
				}
				if(req.query.format === "csv") {
					const data_flds = ['op1_ID', 'op2_ID', 'RequestTimestamp', 'PeriodFrom', 'PeriodTo', 'NumberOfPasses', 'PassesCost'];
					const data_opts = { data_flds };
					var data = parse(response, data_opts);
					res.status(200).send(data);
					console.log("Passes cost query successful (csv)");
				}
				else {
					res.status(200).json(response);
					console.log("Passes cost query successful (json)");
				}
			}	
		});
	});
});

module.exports = router;
