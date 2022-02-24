## CLI
**Initial file** :
- index.js

**Command "helper" files** :
- ChargesBy.js
- PassesAnalysis.js
- PassesCost.js
- PassesPerStation.js

**Admin Command file**
- adminCommands/PassesUpd.js

**Dependencies (Nodejs)** :
- package.json
- package-lock.json

**Additional inofrmation**:
-in folder "cli" run command "npm install -g"

**Packets used ("npm install" if needed)**:
-commander
-axios
-program
-python-shell

**General Notes**:
-first parameter is alwas "se2138"
-add parameter "-h" or "--h" for additional info
-This must be the format for all included commands:
    se2138 passesperstation --station<stationID> --datefrom <datefrom> --dateto <dateto> --format <format>
    se2138 passesanalysis --op1 <op1> --op2 <op2> --datefrom <datefrom> --dateto <dateto> --format <format>
    se2138 passescost --op1 <op1> --op2 <op2> --datefrom <datefrom> --dateto <dateto> --format <format>
    se2138 chargesby --op1 <op1> --datefrom <datefrom> --dateto <dateto> --format <format>
    se2138 healthcheck
    se2138 resetpasses
    se2138 resetvehicles
    se2138 reset stations
    se2138 admin ----passesupd --source <data source>