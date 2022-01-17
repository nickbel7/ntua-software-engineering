const express = require('express')
const router = express.Router();
const pool = require('./connect.js');
const { parse } = require('json2csv');

router.get('/:op_ID/:date_from/:date_to', function(req, res) {
	const date = new Date();
    const req_timestamp = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds();
	const { op_ID, date_from, date_to } = req.params;
	pool.connect(function(err, client) {
		if(err) {
			res.status(500).json({status:"failed"});
			console.log("connection failed", err);
		}
		client.query("SELECT provider2_name AS provider_name, COUNT(charge) AS total_passes, cast(SUM(charge) as DECIMAL(10,2)) AS total_charge FROM passes_transposed WHERE provider1_id = $1 AND pass_time BETWEEN $2 AND $3 group by provider2_name", [op_ID, date_from, date_to], function(err, result) 
		{
			if(err) {
				res.status(400).json({status:"failed"});
				console.log("Charges by query bad request", err);
			}
			else if(!result.rows.length) {
				res.status(402).json({status:"failed"});
                console.log("Charges by query no data");
			}
        	else {
				if(req.query.format === "csv") {
					const data_flds = ['provider_name', 'total_passes', 'total_charge'];
					const data_opts = { data_flds };
					var data = parse(result.rows, data_opts);
					var header = parse({"op_ID":op_ID, "RequestTimestamp":req_timestamp, "PeriodFrom":date_from, "PeriodTo":date_to,"NumberOfPasses":result.rows.length,});
					data = header +'\n'+ data;
					res.status(200).send(data);
                	console.log("Charges by query success (csv)");
				}
				else {
					const response = {
						"op_ID":op_ID,
						"RequestTimestamp":req_timestamp,
						"PeriodFrom":date_from,
						"PeriodTo":date_to,
						// "NumberOfPasses":result.rows.length,
						"PassesList":result.rows,
					}	
					res.status(200).json(response);
					console.log("Charges by query success (json)");
				}
        	}
   		});
	});
});

module.exports = router;
