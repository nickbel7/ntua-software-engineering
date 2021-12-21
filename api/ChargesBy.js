const express = require('express')
const router = express.Router();
const client4 = require('./connection.js');

router.get('/:op_ID/:date_from/:date_to', (req,res) => {
		const { op_ID,date_from,date_to }= req.params;
	client4.query("Select * from passes where station_id LIKE $1 and pass_timestamp between $2 and $3",[op_ID+'%',date_from,date_to],(err, result)=>{
        if(!err){
           res.send(result.rows);
            
        }
        else{
        	res.send("problem!")
        }
       
   });
 	client4.end;
})
module.exports = router;