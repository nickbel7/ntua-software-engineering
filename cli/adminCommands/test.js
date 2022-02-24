let {PythonShell} = require('python-shell')

function runPy(){
    return new Promise(async function(resolve, reject){
          let options = {
          mode: 'text',
          pythonOptions: ['-u'],
          args: ["../../database/DATA-DUMP/DATA_TRANSPOSE/sampledata01_passes.csv"]
         };
          await PythonShell.run('run.py', options, function (err, results) {
          if (err) throw err;
     });
   })
 } 

function runMain(){
    return new Promise(async function(resolve, reject){
        let r =  await runPy()
        console.log("Done")
    })
 }

runMain() //run main function
