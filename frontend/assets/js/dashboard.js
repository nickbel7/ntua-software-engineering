import $ from '../../bundles/node_modules/jquery';
// Charges By --> cb

var cbStartDate = '20190101';
var cbEndDate = '20220101';
var cbProvider1Id = 1; 
var bar_graph; 
var cost_bar_graph; 
var fav_bar_graph; 

const chart_ctx = document.getElementById('bar-graph').getContext('2d');
const cost_chart = document.getElementById('tc-bar-graph').getContext('2d');
const fav_chart = document.getElementById('fav-bar-graph').getContext('2d');

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
    var total_passes_num = 0;   
    var total_revenue = 0;
    var most_lucrative = ['', 0];

    const cost = []; 
    const data1 = []; 
    const name1 = [];
    const fav = []; 

    for (var i=0; i<passes.length; i++) {
        var provider_info = providers[passes[i].provider_name];
        var provider_name = passes[i].provider_name;
        var provider_charge = passes[i].total_charge;
        total_revenue += Number(provider_charge);
        total_passes_num += Number(passes[i].total_passes)
        cost.push(provider_charge);
        data1.push(passes[i].total_passes);
        name1.push(provider_name);

        if (most_lucrative[1] < provider_charge) {
            most_lucrative = [provider_info[2], provider_charge];
        }
    }
    
    $('#cb-fav-result').html("Most Favorite: </br> " + "<b>" + most_lucrative[0] + "</b>");
    $('#cb-results-count').html("Total Passes: </br>" + "<b>" + total_passes_num + "</b>");
    $('#cb-total-cost-count').html("Total Cost: </br>" + "<b>" + total_revenue + "</b>");
    create_cost_bar_chart(cost,name1);
    create_bar_chart(data1,name1);
    create_pie_chart(data1,name1);
}


function create_bar_chart(data1,labels1) {
    bar_graph = new Chart(chart_ctx, {
    type: 'bar',
    data: {
        labels: labels1,
        datasets: [{
            label: '# of Passes',
            data: data1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
        },
        options: {
            responsive: true,
        }
    });
}

function create_cost_bar_chart(cost,labels1) {
    cost_bar_graph = new Chart(cost_chart, {
    type: 'bar',
    data: {
        labels: labels1,
        datasets: [{
            label: '# of Passes',
            data: cost,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
        },
        options: {
            responsive: true,
        }
    });
}

function create_pie_chart(cost,labels1) {
    fav_bar_graph = new Chart(fav_chart, {
    type: 'polarArea',
    data: {
        labels: labels1,
        datasets: [{
            label: '# of Passes',
            data: cost,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
        },
        options: {
            responsive: true,
        }
    });
}