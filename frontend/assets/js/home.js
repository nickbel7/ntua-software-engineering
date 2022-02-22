import $ from '../../bundles/node_modules/jquery';

// $.ajax({
//     // url: 'https://localhost:9103/interoperability/api/PassesCost/1/3/20190101/20210101',
//     url: 'https://localhost:9103/interoperability/api/PassesPerStation/AO01/20190101/20210101',
//     type: 'GET',
//     dataType: 'json',
//     success: onSuccess,
//     error: function(){
//         alert("There was an error :(")
//     }
// });

// function onSuccess(data) {
//     console.log(data);
//     var passes = data.PassesList;   

//     const passList = document.createElement('ul');
//     for (var i=0; i<passes.length; i++) {
//         const passItem = document.createElement('li');
//         passItem.innerHTML = passes[i].vehicle_code;
//         passList.append(passItem);
//     }
    
//     $('#test').html(passList);
    
//     // $("#test").html(data.PassesCost);
// }

