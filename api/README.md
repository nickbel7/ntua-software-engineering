# RESTful API
## Dependencies:
- package.json
- package-lock.json
```
cd ./api
npm install
npm install express
npm install pg
npm install file-system
npm install body-parser
npm install json2csv
```

## Index file:
- index.js [backend/index.js](https://github.com/ntua/TL21-38/blob/master/backend/index.js)

## Connection with PostgreSQL Database:
- connect.js [backend/connect.js](https://github.com/ntua/TL21-38/blob/master/backend/connect.js)

## API Functional Endpoints:
- ChargesBy.js
- PassesAnalysis.js
- PassesCost.js
- PassesPerStation.js

## API Admin Endpoints:
- admin/healthcheck.js
- admin/resetpasses.js
- admin/resetstations.js
- admin/resetvehicles.js
- admin/UploadData.js

## SSL Certificates and Keys (https):
- certificates/localhost.crt
- certificates/localhost.csr
- certificates/hocalhost.decrypted.key
- certificates/localhost.ext
- certificates/localhost.key
- certificates/CA.key
- certificates/CA.pem
- certificates/CA.srl
