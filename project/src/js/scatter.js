// function createScatter(dataType){
//     var data = {};
//     $.ajax({
//       url: "http://35.187.40.70/project/src/dbconfig.php",
//       type: "GET",
//       dataType: "json",
//       success: function (data) {
//         console.log("GET success. Data retrieved and chart ready to be created.");
//         drawScatterPlot(data, dataType);
//         console.log("All charts are created.");
//       },
//       error: function (data) {
//         console.log("GET failed. Failed to retrieve data therefore graphs not created.");
//         console.log(data);
//       }
//     });
//   }

function drawScatterPlot(data,metricType){
  var measurementTime = [];
  var metric = [];

  if(data.length > 0){
    for (var i in data) {
      measurementTime.push((data[i].measurement_time).substr(0, 16)); // nonemtas sekundes
      switch (metricType) {
        case "temperature":
          if((data[i].temperature < 35) && (data[i].temperature > (-35))){
            metric.push(data[i].temperature);
          }
          break;
        case "bar_pressure":
          metric.push(data[i].bar_pressure);
          break;
        case "humidity":
          metric.push(data[i].humidity);
          break;
        case "rain":
          metric.push(data[i].rain);
          break;
        case "wind_speed":
          metric.push(data[i].wind_speed);
          break;
        case "wind_gust":
          metric.push(data[i].wind_gust);
          break;
        case "wind_speed_count":
          metric.push(data[i].wind_speed_count);
          break;
        case "wind_direction":
          metric.push(data[i].wind_direction);
          break;
        case "solar_radiation":
          metric.push(data[i].solar_radiation);
          break;
        case "input_voltage":
          metric.push(data[i].input_voltage);
          break;
        default:
            console.log("ERROR in reateCharts() - Following graph does have any values: " + metricType);
      }
    }
  }
  else{
    measurementTime.push(moment().subtract(2, 'hour').format());
    metric.push(-1);
  }

  var trace1 = {
      x: measurementTime,
      y: metric,
      mode: 'markers+text',
      type: 'scatter',
      textposition: 'top center',
      textfont: {
        family:  'Raleway, sans-serif'
      },
      marker: { size: 12 }
    };
    
    var data = [ trace1 ];
    
    var layout = {
      legend: {
        y: 0.5,
        yref: 'paper',
        font: {
          family: 'Arial, sans-serif',
          size: 20,
          color: 'grey',
        }
      },
      title: metricType
    };
    
    return Plotly.newPlot('ct-chart', data, layout);
}

function changeTypeForScatter(selectedType) {
  var value = selectedType.value;  
  var data = {};
  $.ajax({
    url: "http://35.195.69.44/project/src/dbconfig.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("GET success. Data retrieved scatter will be updated. Maybe.");  
      drawScatterPlot(data, value);
      console.log("Scatter updated.");
    },
    error: function (data) {
      console.log("GET failed. Failed to retrieve data therefore scatter not updated.");
      console.log(data);
    }
  });
}


