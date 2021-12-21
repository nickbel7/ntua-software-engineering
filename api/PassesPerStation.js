const express = require('express')
const router = express.Router();
const client = require('./connection.js');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

client.connect();
router.get('/:station_id/:date_from/:date_to', (req,res) => {
	const { station_id,date_from,date_to } = req.params;
	client.query("Select * from passes where station_id=$1 and pass_timestamp between $2 and $3",[station_id,date_from,date_to],(err, result)=>{
		console.log(typeof req.params.stationID);
        if(!err){
           // res.send(result.rows);
            const str =`Station: ${req.params.station_id}`;
            res.send(str);
        }
        else{
        	res.send("problem!")
        }
       
   });
 	client.end;
})
module.exports = router;

