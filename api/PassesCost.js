const express = require('express')
const router = express.Router();


router.get('/:op1_ID/:op2_ID/:date_from/:date_to', (req,res) => {
	res.end('op1 ID is '+ req.params.op1_ID);
});
module.exports = router;