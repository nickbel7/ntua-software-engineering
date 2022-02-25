# cli
**Contents**:
- CLI 
---

**Initial file** :
- index.js

**Command "helper" files** :
- ChargesBy.js
- PassesAnalysis.js
- PassesCost.js
- PassesPerStation.js

**Admin Command file**
- adminCommands/PassesUpd.js

**Requirements ("npm install" if needed)** :
- node.js
- commander
- axios
- program
- python-shell

**How to run**:
- first parameter is always "se2138"
- add parameter "-h" or "--h" for additional info
- This must be the format for all included commands:<br />
&nbsp; &nbsp; &nbsp;se2138 passesperstation --station<stationID> --datefrom <datefrom> --dateto <dateto> --format <format><br />
&nbsp; &nbsp; &nbsp;se2138 passesanalysis --op1 <op1> --op2 <op2> --datefrom <datefrom> --dateto <dateto> --format <format><br />
&nbsp; &nbsp; &nbsp;se2138 passescost --op1 <op1> --op2 <op2> --datefrom <datefrom> --dateto <dateto> --format <format><br />
&nbsp; &nbsp; &nbsp;se2138 chargesby --op1 <op1> --datefrom <datefrom> --dateto <dateto> --format <format><br />
&nbsp; &nbsp; &nbsp;se2138 healthcheck<br />
&nbsp; &nbsp; &nbsp;se2138 resetpasses<br />
&nbsp; &nbsp; &nbsp;se2138 resetvehicles<br />
&nbsp; &nbsp; &nbsp;se2138 reset stations<br />
&nbsp; &nbsp; &nbsp;se2138 admin ----passesupd --source <data source><br />

**General Notes**:
- In folder "cli" run command "npm install -g"
- For the "passesupd" command, use as "data source" : "../cli/data/sampledata_passes.csv"