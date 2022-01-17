const express = require('express'),
 app = express(),
 port = 9103,
 router = express.Router();
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('./certificates/localhost.decrypted.key');
const cert = fs.readFileSync('./certificates/localhost.crt');
const server = https.createServer({ key, cert }, app);

const baseurl = '/interoperability/api';
const adminhealth = require('./admin/healthcheck'),
	resetpasses = require('./admin/resetpasses'),
	resetstations = require('./admin/resetstations'),
	resetvehicles = require('./admin/resetvehicles'),
	passesperstation = require('./PassesPerStation'),
	passesanalysis = require('./PassesAnalysis'),
	passescost = require('./PassesCost'),
	chargesby = require('./ChargesBy');

app.get(baseurl, (req,res) => {
	res.end('DIODE IS UP!');
});

server.listen(port, () => {
	console.log(`app listening at: https://localhost:${port}${baseurl}`);
});

app.use(baseurl+'/admin/healthcheck', adminhealth);
app.use(baseurl+'/admin/resetpasses', resetpasses);
app.use(baseurl+'/admin/resetstations', resetstations);
app.use(baseurl+'/admin/resetvehicles', resetvehicles);
app.use(baseurl+'/PassesPerStation', passesperstation);
app.use(baseurl+'/PassesAnalysis', passesanalysis);
app.use(baseurl+'/PassesCost', passescost);
app.use(baseurl+'/ChargesBy', chargesby);


