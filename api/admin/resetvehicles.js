const express = require('express')
const router = express.Router();

router.get('/', (req,res) => {
	res.end('RESETVEHICLES WORKS!');
});
module.exports = router;