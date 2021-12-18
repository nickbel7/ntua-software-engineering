const express = require('express')
const router = express.Router();


router.get('/', (req,res) => {
	res.end('RESETSTATIONS WORKS!');
});
module.exports = router;