const axios = require ('axios');
let {PythonShell} = require('python-shell')
const path = require('path'); 
const fs = require('fs');

module.exports = function apu(source) {
 
    function runPy(){
        return new Promise(async function(resolve, reject){
              let options = {
              mode: 'text',
              pythonOptions: ['-u'],
              args: [source]
             };
              await PythonShell.run(path.join(__dirname,'/') +'run.py', options, function (err, results) {
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
