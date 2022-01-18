const axios = require ('axios');

module.exports = function pccall(op1,op2,datefrom,dateto,format) {

    let url='https://localhost:9103/interoperability/api/PassesCost/'+op1+'/'+op2+'/'+datefrom+'/'+dateto+'?format='+format;
    axios.get(url).then( resp => {
        console.log(resp.data);
    });
}
