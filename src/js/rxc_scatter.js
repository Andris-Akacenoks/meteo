// function createNewRxcChart(data, timeArray){
//     Highcharts.chart('rxc-chart', {
//         chart: {
//             type: 'scatter',
//             zoomType: 'xy'
//         },
//         title: {
//             text: 'Sensor temperature'
//         },
//         xAxis: {
//             categories: timeArray,
//             // startOnTick: true,
//             // endOnTick: true,
//             // showLastLabel: true
//         },
//         yAxis: {
//             title: {
//                 text: 'Degrees (K)'
//             },

//         },
//         legend: {
//             layout: 'vertical',
//             align: 'left',
//             verticalAlign: 'top',
//             x: 100,
//             y: 70,
//             floating: true,
//             backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
//             borderWidth: 1
//         },
//         plotOptions: {
//             scatter: {
//                 marker: {
//                     radius: 5,
//                     states: {
//                         hover: {
//                             enabled: true,
//                             lineColor: 'rgb(100,100,100)'
//                         }
//                     }
//                 },
//                 states: {
//                     hover: {
//                         marker: {
//                             enabled: false
//                         }
//                     }
//                 },
//                 tooltip: {
//                     headerFormat: '<b>{series.name}</b><br>',
//                     pointFormat: '{point.x}, {point.y} K'
//                 }
//             }
//         },
//         series: [{
//             name: 'Sensor A',
//             color: 'red',
//             data: data
//         }
//         // }, {
//         //     name: 'Male',
//         //     color: 'rgba(119, 152, 191, .5)',
//         //     data: [1,2,3,4,5]
//         // }
//         ]
//     });

// }


// function createRxcCharts() {
//     var data = {};
//     $.ajax({
//         url: "http://35.195.233.207/src/datasources/meteo_data_source.php",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             var values = [];
//             var times = [];
//             var both = [];

//             for (var j=0; j<data.length; j++) {
//                 values.push(parseFloat(data[j].temperature.replace(",", ".")));
//                 var parts =data[j].measurement_time.split('-');
//                 // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
//                 // January - 0, February - 1, etc.
//                 var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 

//                 var dateString = data[j].measurement_time;
//                 var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
//                 var dateArray = reggie.exec(dateString); 
//                 var dateObject = new Date(
//                     (+dateArray[1]),
//                     (+dateArray[2])-1, // Careful, month starts at 0!
//                     (+dateArray[3]),
//                     (+dateArray[4]),
//                     (+dateArray[5]),
//                     (+dateArray[6])
//                 );
//                 times.push(dateObject);
//             }
//             both.push(times, values);
//             createNewRxcChart(times, both);

//         }
//     });
// }
// //createRxcCharts();



function drawRxcChart(time, values){
    var canvas = document.getElementById("rxc-chart");
    var ctx = canvas.getContext('2d');
    
    var chart = {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: values
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    }
}