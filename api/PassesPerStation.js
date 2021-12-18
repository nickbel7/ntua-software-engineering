const express = require('express')
const router = express.Router();


router.get('/:stationID/:date_from/:date_to', (req,res) => {
	res.end('Station ID is '+ req.params.stationID);
});
module.exports = router;