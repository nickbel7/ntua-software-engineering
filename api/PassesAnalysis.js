const express = require('express')
const router = express.Router();
const client2 = require('./connection.js');


client2.connect();
router.get('/:op1_ID/:op2_ID/:date_from/:date_to', (req,res) => {
	const { op1_ID,op2_ID,date_from,date_to }= req.params;
	client2.query("Select * from passes where tag_id LIKE $1 AND station_id LIKE $2and pass_timestamp between $3 and $4",[op1_ID+'%',op2_ID+'%',date_from,date_to],(err, result)=>{
        if(!err){
           res.send(result.rows);
            
        }
        else{
        	res.send("problem!")
        }
       
   });
 	client2.end;
})
module.exports = router;