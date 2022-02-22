import $ from '../../bundles/node_modules/jquery';

var paProvider1Id = '1';
var paProvider2Id = '2';
var paStartDate = '20190101';
var paEndDate = '20220101';

$(document).ready(function(){
    paApiCall();

    // INPUT FIELDS (defaults)
    $('#pa-provider2-name').val(paProvider2Id);
    $('#pa-start-date').val(paStartDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
    $('#pa-end-date').val(paEndDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
}); 

$('#pa-submit-btn').on('click', function() {
    paProvider2Id = $('#pa-provider2-name').val();
    paStartDate = $('#pa-start-date').val().replace(/-/g, "");
    paEndDate = $('#pa-end-date').val().replace(/-/g, "");
    paApiCall();
}); 

function paApiCall() {
    $.ajax({
        url: `https://localhost:9103/interoperability/api/PassesAnalysis/${paProvider1Id}/${paProvider2Id}/${paStartDate}/${paEndDate}`,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: onSuccessPA,
        error: function(){
            alert("There was an error in PassesPerStation request :(")
        }
    });
}

function onSuccessPA(data) {
    var passes = data.PassesList;   
    var total_revenue = 0;
    var most_visited = {};
    
    $('#pa-table').html("");   // Clear the table
    for (var i=0; i<passes.length; i++) {
        $('#pa-table').append("<tr>"+
        "<td>"+passes[i].row_number+"</td>"+
        "<td>"+passes[i].station_name+"</td>"+
        "<td>"+passes[i].pass_code+"</td>"+
        "<td>"+passes[i].vehicle_code+"</td>"+
        "<td>"+passes[i].charge+" \u20AC"+"</td>"+
        "<td>"+passes[i].pass_time+"</td>"+
        "</tr>");

        total_revenue += passes[i].charge;
        let station_name = passes[i].station_name;
        if (most_visited[station_name] == null) {
            most_visited[station_name] = 0;
        }
        else {
            most_visited[station_name] += 1;
        }
    }

    console.log(most_visited);
    const max_station = Object.entries(most_visited).reduce((a, most_visited) => a[1] > most_visited[1] ? a : most_visited)[0]
    // console.log(result);
    // var  = 0;
    // for (var key in most_visited) {
    //     max_station = max(max_passes, most_visited[key])
    // }
    $('#pa-total-revenue').html(Math.round(total_revenue)+" \u20AC");
    $('#pa-max-station').html(max_station);
    $('#pa-results-count').html("<b>Results : </b>" + passes.length);
    $('#pa-timestamp').html("<b>Last Update : </b>" + data.RequestTimestamp);
}