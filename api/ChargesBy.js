const express = require('express')
const router = express.Router();


router.get('/:op_ID/:date_from/:date_to', (req,res) => {
	res.end('op ID is '+ req.params.op_ID);
});
module.exports = router;