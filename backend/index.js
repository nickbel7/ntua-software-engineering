const path = require('path');
const express = require('express'),
 app = express(),
 webapp = express(),
 port = 9103,
 router = express.Router();
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('./certificates/localhost.decrypted.key');
const cert = fs.readFileSync('./certificates/localhost.crt');
const server = https.createServer({ key, cert }, app);
const webserver = https.createServer({ key , cert }, webapp);

const baseurl = '/interoperability/api';
const adminhealth = require('../api/admin/healthcheck'),
	resetpasses = require('../api/admin/resetpasses'),
	resetstations = require('../api/admin/resetstations'),
	resetvehicles = require('../api/admin/resetvehicles'),
	passesperstation = require('../api/PassesPerStation'),
	passesanalysis = require('../api/PassesAnalysis'),
	passescost = require('../api/PassesCost'),
	chargesby = require('../api/ChargesBy');

app.get(baseurl, (req,res) => {
	res.end('DIODE IS UP!');
});

server.listen(port, () => {
	console.log(`app listening at: https://localhost:${port}${baseurl}`);
});

// RESTFUL API ROUTES
app.use(baseurl+'/admin/healthcheck', adminhealth);
app.use(baseurl+'/admin/resetpasses', resetpasses);
app.use(baseurl+'/admin/resetstations', resetstations);
app.use(baseurl+'/admin/resetvehicles', resetvehicles);
app.use(baseurl+'/PassesPerStation', passesperstation);
app.use(baseurl+'/PassesAnalysis', passesanalysis);
app.use(baseurl+'/PassesCost', passescost);
app.use(baseurl+'/ChargesBy', chargesby);


// WEB SERVER (for frontend)
webserver.listen(80, () => {
	console.log('Web-server is up and runing at: https://localhost:80');
});

webapp.use(express.static(path.join(__dirname, '..') + "/frontend/assets"));
webapp.use(express.static(path.join(__dirname, '..') + "/frontend/bundles"));

webapp.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, '..') + "/frontend/templates/index.html");
});

module.exports = router;