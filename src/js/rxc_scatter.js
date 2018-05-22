

// function drawRcxTemp(div, yData1, yData2, xData,name){

//   var trace1 = {
//       x: xData,
//       y: yData1,
//       mode: 'markers+text',
//       type: 'scatter',
//       name: 'Sensor A',
//       textposition: 'top center',
//       textfont: {
//         family:  'Raleway, sans-serif'
//       },
//       marker: {
//          size: 7, 
//          color: 'red'}
//   };

//   var trace2 = {
//       x: xData,
//       y: yData2,
//       name: 'Temperature',
//       mode: 'markers+text',
//       type: 'scatter',
//       name: 'Sensor B',
//       textposition: 'top center',
//       textfont: {
//         family:  'Raleway, sans-serif'
//       },
//       marker: {
//          size: 7, 
//          color: 'blue'}
//   };
    
//   var data = [ trace1 , trace2];
    
//   var layout = {
//     legend: {
//       y: 0.5,
//       yref: 'paper',
//       font: {
//         family: 'Arial, sans-serif',
//         size: 13,
//         color: 'grey',
//       }
//     },
//     title: name
//   };
    
//   return Plotly.newPlot(div, data, layout);
// }


// // function drawPlotlyChart()a

// function drawSysTempChart() {

//   $.ajax({
//     url: "http://35.195.233.207/src/datasources/rxc_data_source.php?interval=24h",
//     type: "GET",
//     dataType: "json",
//     success: function (data) {    
    
//         var measurementTime = [];
//         var temp1 = [];
//         var temp2 = [];

//         console.log(data);
//         var data = JSON.stringify(data);
//         console.log(data);
//         var rawData = data;
//         var str = rawData.substring(0, rawData.length - 2);
//         str = str.substring(10);
//         console.log(str);
//         str = str.replace(/\\r/g,'');
//         str = str.replace(/\\n/g, '<br/>');
//         str = str.replace(/\\/g, '');
//         var obj = JSON.parse(str);	
//         console.log(obj);
    
//         // for (var j=0; j<data.length; j++) {
//         //     measurementTime.push((data[j].measurement_time).substr(0, 16)); // nonemtas sekundes
//         //     bar_pressure.push(data[j].bar_pressure);


//         // }


//         // drawRcxTemp('rxc-chart', temp1, temp2, measurementTime,"Sensor temperature");
//         // printLog("rxc-chart updated.");
//     },
//     error: function (data) {
//         printLog("GET failed. Failed to retrieve data therefore scatter not updated.");
//         printLog(data);
//     }
//   });
// }


