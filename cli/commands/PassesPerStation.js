const axios = require ('axios');

module.exports = function ppscall(station,datefrom,dateto,format) {

    let url='https://localhost:9103/interoperability/api/PassesPerStation/'+station+'/'+datefrom+'/'+dateto+'?format='+format;
    axios.get(url).then( resp => {
        console.log(resp.data);
    });
}
