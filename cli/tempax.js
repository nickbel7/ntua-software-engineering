const axios = require('axios');
axios.head('http://kudu.gr').then(resp => {

    console.log(resp.data);
});