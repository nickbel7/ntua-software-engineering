import $ from '../../bundles/node_modules/jquery';

var data = 
$.ajax({
    url:'https://localhost:9103/interoperability/api/PassesCost/1/3/20190101/20210101',
    type:'GET',
    dataType: 'json',
    success: function(res){
        console.log(res);
        return res;
    },
    error: function(){
        alert("There was an error :(")
    }
});

console.log(data);

