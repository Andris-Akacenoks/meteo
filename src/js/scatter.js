
function drawScatterPlot(identifier, div, data,metricType, name, color){
  var measurementTime = [];
  var metric = [];
  var metric2 = [];

  var label1 = "";
  var label2 = "";

  var traceArray = [];

  if(identifier == 'temperatures'){
    label1 = "Sensor A";
    label2 = "Sensor B";


    
    var trace2 = {
      x: measurementTime,
      y: metric2,
      name: label2,
      mode: 'markers+text',
      type: 'scatter',
      textposition: 'top center',
      textfont: {
        family:  'Raleway, sans-serif'
      },
      marker: {
        size: 7, 
        color: color}
        
  };

  traceArray.push(trace2);

  }
  else{
    label1 = metricType;
  }
  
  if(data.length > 0){
    for (var i in data) {
      measurementTime.push(data[i].measurement_time); // nonemtas sekundes
      metric2.push(data[i].humidity - 5);

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
          if((data[i].humidity >= 0) && (data[i].humidity <= 100)){
            metric.push(data[i].humidity);
          }
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
          printLog("ERROR in reateCharts() - Following graph does have any values: " + metricType);
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
      name: label1,
      textposition: 'top center',
      textfont: {
        family:  'Raleway, sans-serif'
      },
      marker: {
         size: 7, 
         color: 'red'}
         
  };

  traceArray.push(trace1);


    
  var data = traceArray;
    
  var layout = {
    legend: {
      y: 0.5,
      yref: 'paper',
      font: {
        family: 'Arial, sans-serif',
        size: 15,
        color: 'grey',
      }
    },
    title: name
  };
    
  return Plotly.newPlot(div, data, layout);
}


// function drawPlotlyChart()a

function changeTypeForScatter(selectedType) {
  var value = selectedType.value;  
  var data = {};
  $.ajax({
    url: "http://35.195.233.207/src/datasources/meteo_data_source.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      printLog("GET success. Data retrieved scatter will be updated. Maybe.");  
            var title = value.charAt(0).toUpperCase() + value.slice(1);
            title = title.replace(/\_/g,' ');

            drawScatterPlot('meteoScatter','ct-chart', data,  value,title, 'blue');


      printLog("Scatter updated.");
    },
    error: function (data) {
      printLog("GET failed. Failed to retrieve data therefore scatter not updated.");
      printLog(data);
    }
  });
}


