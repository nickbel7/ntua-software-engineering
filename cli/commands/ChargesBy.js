const axios = require ('axios');

module.exports = function cbcall(op1,datefrom,dateto,format) {

    let url='https://localhost:9103/interoperability/api/ChargesBy/'+op1+'/'+datefrom+'/'+dateto+'?format='+format;
    axios.get(url).then( resp => {
        console.log(resp.data);
    });
}
