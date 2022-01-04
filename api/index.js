const express = require('express'),
 app = express(),	// represents the API
 PORT = 9103,	// defines the port that the API listens to
 router = express.Router();

app.use(express.json())	//middleware to handle json body requests

global.DATA = 1;
const baseurl = '/interoperability/api';
const adminhealth = require('./admin/healthcheck'),
	resetpasses = require('./admin/resetpasses'),
	resetstations = require('./admin/resetstations'),
	resetvehicles = require('./admin/resetvehicles'),
	passesperstation = require('./PassesPerStation'),
	passesanalysis = require('./PassesAnalysis'),
	passescost = require('./PassesCost'),
	chargesby = require('./ChargesBy');


// CHECK IF API IS FIRED UP
app.listen(
	PORT, 
	() => console.log(`app listening at: https://localohost:${port}${baseurl}`)
)

// ENDPOINTS
app.get(baseurl, (req,res) => {
	res.status(200).send('DIODE IS UP :)');
});

app.use(baseurl+'/admin/healthcheck', adminhealth);
app.use(baseurl+'/admin/resetpasses', resetpasses);
app.use(baseurl+'/admin/resetstations', resetstations);
app.use(baseurl+'/admin/resetvehicles', resetvehicles);
app.use(baseurl+'/PassesPerStation', passesperstation);
app.use(baseurl+'/PassesAnalysis', passesanalysis);
app.use(baseurl+'/PassesCost', passescost);
app.use(baseurl+'/ChargesBy', chargesby);