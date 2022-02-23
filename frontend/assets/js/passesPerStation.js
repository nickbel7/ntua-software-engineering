import $ from '../../bundles/node_modules/jquery';
// Passes Per Station --> pps

var ppsStationName = 'AO01';
var ppsStartDate = '20190101';
var ppsEndDate = '20220101';

$(document).ready(function(){
    ppsApiCall();

    // INPUT FIELDS (defaults)
    $('#pps-station-id').val(ppsStationName);
    $('#pps-start-date').val(ppsStartDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
    $('#pps-end-date').val(ppsEndDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
}); 

$('#pps-submit-btn').on('click', function() {
    ppsStationName = $('#pps-station-id').val();
    ppsStartDate = $('#pps-start-date').val().replace(/-/g, "");
    ppsEndDate = $('#pps-end-date').val().replace(/-/g, "");
    ppsApiCall();
}); 

function ppsApiCall() {
    $.ajax({
        url: `https://localhost:9103/interoperability/api/PassesPerStation/${ppsStationName}/${ppsStartDate}/${ppsEndDate}`,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: onSuccessPPS,
        error: function(){
            alert("There was an error in PassesPerStation request :(")
        }
    });
}

function onSuccessPPS(data) {
    var passes = data.PassesList;   
    var total_revenue = 0;
    var total_home = 0;
    var total_away = 0;
    
    $('#pps-table').html("");   // Clear the table
    for (var i=0; i<passes.length; i++) {
        $('#pps-table').append("<tr>"+
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

    $('#pps-total-revenue').html(Math.round(total_revenue*100)/100+" \u20AC");
    $('#pps-total-home').html(total_home);
    $('#pps-total-away').html(total_away);
    $('#pps-results-count').html("<b>Results : </b>" + passes.length);
    $('#pps-timestamp').html("<b>Last Update : </b>" + data.RequestTimestamp);
}