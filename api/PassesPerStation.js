const express = require('../backend/node_modules/express')
const router = express.Router();
const pool = require('../backend/connect');
const { parse } = require('../backend/node_modules/json2csv');

router.get('/:station_id/:date_from/:date_to', function(req, res) {
	const date = new Date();
        const req_timestamp = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds();
	const { station_id, date_from, date_to } = req.params;
	pool.connect(function(err, client) {
                if(err) {
                        res.status(500).json({status:"failed"});
                        console.log("connection failed", err);
                }
		var station_op;
                client.query("SELECT DISTINCT provider1_name FROM passes_transposed WHERE station_name = $1", [station_id], function(err, result) {
                        if(result.rows.length)
                                station_op = result.rows[0].provider1_name;
                });
		client.query("SELECT ROW_NUMBER() OVER (ORDER BY 1), pass_code, pass_time, vehicle_code, provider2_name, pass_type, charge FROM passes_transposed WHERE station_name = $1 AND pass_time BETWEEN $2 AND $3", [station_id, date_from, date_to], function(err, result) {
			if(err) {
                                res.status(400).json({status:"failed"});
                                console.log("Passes per station query bad request", err);
                        }
                        else if(!result.rows.length) {
                                res.status(402).json({status:"failed"});
                                console.log("Passes per station query no data");
                        }
                        else {
                                if(req.query.format === "csv") {
					const data_flds = ['ROW_NUMBER()', 'pass_code', 'pass_time', 'vehicle_code', 'provider2_name', 'pass_type', 'charge'];
                                        const data_opts = { data_flds };
                                        var data = parse(result.rows, data_opts);
                                        var header = parse({"Station":station_id, "StationOperator":station_op, "RequestTimestamp":req_timestamp, "PeriodFrom":date_from, "PeriodTo":date_to,"NumberOfPasses":result.rows.length,});
                                        data = header +'\n'+ data;
                                        res.status(200).send(data);
                                        console.log("Passes per station query successful (csv)");
                                }
                                else {
					const response = {
                                                "Station":station_id,
                                                "StationOperator":station_op,
                                                "RequestTimestamp":req_timestamp,
                                                "PeriodFrom":date_from,
                                                "PeriodTo":date_to,
                                                "NumberOfPasses":result.rows.length,
                                                "PassesList":result.rows,
                                	}
                                        res.status(200).json(response);
                                        console.log("Passes per station successful (json)");
                                }
                        }
		});
	});
});

module.exports = router;
