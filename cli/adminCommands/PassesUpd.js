const axios = require ('axios');
let {PythonShell} = require('python-shell')

module.exports = function apu(source) {
    
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
    
    runMain() 
    
    let url='https://localhost:9103/interoperability/api/admin/UploadData';
    axios.post(url).then( resp => {
        console.log(resp.data);
    });

}
