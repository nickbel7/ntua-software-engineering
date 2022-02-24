const path = require('path');
const express = require('express'),
 app = express(),
 webapp = express(),
//  port = 9103,
 router = express.Router();
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const PORT = process.env.PORT || 9103;
const baseurl = '/interoperability/api';

// TEMPLATE INHERITANCE
const nunjucks = require('nunjucks');	// templating framework

nunjucks.configure(['../frontend/templates/'], {
	autoescape: false,
	express: webapp
})

const key = fs.readFileSync('./certificates/localhost.decrypted.key');
const cert = fs.readFileSync('./certificates/localhost.crt');
const server = https.createServer({ key, cert }, app);
const webserver = https.createServer({ key , cert }, webapp);

// API WEB SERVER
app.get(baseurl, (req,res) => {
	res.end('DIODE IS UP!');
});

server.listen(PORT, () => {
	console.log(`app listening at: https://localhost:${PORT}${baseurl}`);
});

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors());

// WEB SERVER (for frontend)
webserver.listen(80, () => {
	console.log('Web-server is up and runing at: https://localhost:80');
});

const adminhealth = require('../api/admin/healthcheck'),
	resetpasses = require('../api/admin/resetpasses'),
	resetstations = require('../api/admin/resetstations'),
	resetvehicles = require('../api/admin/resetvehicles'),
	passesperstation = require('../api/PassesPerStation'),
	passesanalysis = require('../api/PassesAnalysis'),
	passescost = require('../api/PassesCost'),
	chargesby = require('../api/ChargesBy'),
	uploaddata = require('../api/admin/UploadData');
const { homedir } = require('os');

// RESTFUL API ROUTES
app.use(baseurl+'/admin/healthcheck', adminhealth);
app.use(baseurl+'/admin/resetpasses', resetpasses);
app.use(baseurl+'/admin/resetstations', resetstations);
app.use(baseurl+'/admin/resetvehicles', resetvehicles);
app.use(baseurl+'/PassesPerStation', passesperstation);
app.use(baseurl+'/PassesAnalysis', passesanalysis);
app.use(baseurl+'/PassesCost', passescost);
app.use(baseurl+'/ChargesBy', chargesby);
app.use(baseurl+'/admin/UploadData', uploaddata);

// ROUTES FOR FRONTEND
webapp.use(express.static(path.join(__dirname, '..') + "/frontend/assets"));
webapp.use(express.static(path.join(__dirname, '..') + "/frontend/bundles/dist"));

webapp.use("/", require('./routes/Home.routes.js'));
webapp.use("/chargesby", require('./routes/ChargesBy.routes.js'));
webapp.use("/passesanalysis", require('./routes/PassesAnalysis.routes.js'));
webapp.use("/passesperstation", require('./routes/PassesPerStation.routes.js'));

module.exports = router;
