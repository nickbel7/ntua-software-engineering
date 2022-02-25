# Back-end

### Dependencies
```
cd ./api
npm install
npm install express
npm install pg
npm install file-system
npm install body-parser
npm install json2csv

## RESTful API
**Initial file** :
- index.js (backend)

**API files** :
- ChargesBy.js
- PassesAnalysis.js
- PassesCost.js
- PassesPerStation.js

**API files ADMIN**
- admin/healthcheck.js
- admin/resetpasses.js
- admin/resetstations.js
- admin/resetvehicles.js
- admin/UploadData.js

**Connection with DB** :
- connect.js (backend)

**Dependencies (Nodejs)** :
- package.json
- package-lock.json

**(HTTPS) Certificate, key for localhost** :
- certificates/localhost.crt
- certificates/localhost.csr
- certificates/hocalhost.decrypted.key
- certificates/localhost.ext
- certificates/localhost.key
- certificates/CA.key
- certificates/CA.pem
- certificates/CA.srl
