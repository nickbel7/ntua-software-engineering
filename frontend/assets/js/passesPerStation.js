import $ from '../../bundles/node_modules/jquery';
$(document).ready(function(){
    $.ajax({
        url: 'https://localhost:9103/interoperability/api/PassesPerStation/AO01/20190101/20210101',
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: onSuccess,
        error: function(){
            alert("There was an error in PassesPerStation request :(")
        }
    });
}); 

function onSuccess(data) {
    console.log(data);
    var passes = data.PassesList;   
    var total_revenue = 0;
    var total_home = 0;
    var total_away = 0;
    
    for (var i=0; i<passes.length; i++) {
        $('#pps').append("<tr>"+
        "<td>"+passes[i].row_number+"</td>"+
        "<td>"+passes[i].provider2_name+"</td>"+
        "<td>"+passes[i].pass_code+"</td>"+
        "<td>"+passes[i].vehicle_code+"</td>"+
        "<td>"+passes[i].charge+" \u20AC"+"</td>"+
        "<td>"+passes[i].pass_type+"</td>"+
        "<td>"+passes[i].pass_time+"</td>"+
        "<td>"+"<span "+(passes[i].pass_type.trim() === 'away' ? "class='dot away-flag'" : "class='dot home-flag'")+"></span>"+"</td>"+
        "</tr>");

        total_revenue += passes[i].charge;
        if (passes[i].pass_type.trim() === 'away') {
            total_away += 1;
        }
        else {
            total_home += 1;
        }
    }

    $('#pps-total-revenue').append(Math.round(total_revenue)+" \u20AC");
    $('#pps-total-home').append(total_home);
    $('#pps-total-away').append(total_away);
    $('#pps-results-count').append(passes.length);
    $('#pps-timestamp').append(data.RequestTimestamp);
}