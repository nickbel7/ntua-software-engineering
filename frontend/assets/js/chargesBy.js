import $ from '../../bundles/node_modules/jquery';
// Charges By --> cb

var cbProvider1Id = '1';
var cbStartDate = '20190101';
var cbEndDate = '20220101';

var providers = {
    "aodos" : [1, "Aodos", "AO"],
    "gefyra" : [2, "Gefyra", "GF"],
    "egnatia" : [3, "Egnatia", "EG"],
    "kentriki_odos" : [4, "Kentriki Odos", "KO"],
    "moreas" : [5, "Moreas", "MR"],
    "nea_odos" : [6, "Nea Odos", "NE"],
    "olympia_odos" : [7, "Olympia Odos", "OO"]
    }

$(document).ready(function(){
    cbApiCall();

    // INPUT FIELDS (defaults)
    $('#cb-start-date').val(cbStartDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
    $('#cb-end-date').val(cbEndDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
}); 

$('#cb-submit-btn').on('click', function() {
    cbStartDate = $('#cb-start-date').val().replace(/-/g, "");
    cbEndDate = $('#cb-end-date').val().replace(/-/g, "");
    cbApiCall();
}); 

function cbApiCall() {
    $.ajax({
        url: `https://localhost:9103/interoperability/api/ChargesBy/${cbProvider1Id}/${cbStartDate}/${cbEndDate}`,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: onSuccessCB,
        error: function(){
            alert("There was an error in PassesPerStation request :(")
        }
    });
}

function onSuccessCB(data) {
    var passes = data.PassesList;   
    var total_revenue = 0;
    var most_lucrative = ['', 0];
    
    $('#cb-table').html("");   // Clear the table
    for (var i=0; i<passes.length; i++) {
        var provider_info = providers[passes[i].provider_name];
        var provider_charge = passes[i].total_charge;
        $('#cb-table').append("<tr>"+
        "<td>"+provider_info[0]+"</td>"+    // provider id
        "<td>"+provider_info[1]+"</td>"+    // provider name
        "<td>"+provider_info[2]+"</td>"+    // provider abbr
        "<td>"+passes[i].total_passes+"</td>"+
        "<td>"+provider_charge+" \u20AC"+"</td>"+
        "</tr>");

        total_revenue += Number(provider_charge);
        // console.log(total_revenue);
        if (most_lucrative[1] < provider_charge) {
            most_lucrative = [provider_info[2], provider_charge];
        }
    }

    $('#cb-total-revenue').html(Math.round(total_revenue*100)/100+" \u20AC");
    $('#cb-max-provider').html(most_lucrative[0]);
    $('#cb-results-count').html("<b>Results : </b>" + passes.length);
    $('#cb-timestamp').html("<b>Last Update : </b>" + data.RequestTimestamp);
}