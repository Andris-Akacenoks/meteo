var index = 0;
var myCharts = [];
var interval;
var pointBackgroundColors = [];
var refreshAllowed = true; // default view is last 1 hour so chart updating will be enabled when page is first openend

function changeInterval(value, isRefreshAllowed){
  interval = value;
  refreshAllowed = isRefreshAllowed;
  updateCharts(interval, refreshAllowed);
  if(isRefreshAllowed){
    console.log("refreshAllowed set to TRUE");
  }
  else{
    console.log("refreshAllowed set to FALSE");

  }
}

function setLatestValues(data){
  document.getElementById("lastTime").innerHTML = "<strong>Last measurement taken on: </strong>" + data[data.length-1].measurement_time;
  document.getElementById("lastRain").innerHTML = "<strong>Rain: </strong>" + data[data.length-1].rain+ " " + getMetric("rain");
  document.getElementById("lastTemperature").innerHTML = "<strong>Temperature: </strong>" + data[data.length-1].temperature+ " " + getMetric("temperature");
  document.getElementById("lastHumidity").innerHTML = "<strong>Humidity: </strong>" + data[data.length-1].humidity+ " " + getMetric("humidity");
  document.getElementById("lastPressure").innerHTML = "<strong>Atmospheric pressure: </strong>" + data[data.length-1].bar_pressure + " " + getMetric("bar_pressure");
  document.getElementById("lastVoltage").innerHTML = "<strong>Voltage: </strong>" + data[data.length-1].input_voltage + " " + getMetric("input_voltage");
}


function createCharts() {
  var data = {};
  $.ajax({
    url: "http://35.187.40.70/project/src/dbconfig.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("GET success. Data retrieved and charts ready to be created.");
      //console.log(data);
      setLatestValues(data);

      createLineChart("Atmospheric pressure", 'chart1', data, "bar_pressure", "#0000FF"); index++;
      createLineChart("Temperature", "chart2", data, "temperature", "#CC0000");           index++;
      createLineChart("Humidity", "chart3", data, "humidity", "#008000");                 index++;
      createLineChart("Rain", "chart9", data, "rain", "#191970");                         index++;
      createLineChart("Voltage", "chart5", data, "input_voltage", "#2F4F4F");             index++;
      createLineChart("Wind speed", "chart6", data, "wind_speed", "#2F4F4F");             index++; // waiting for non-zero values 
      createLineChart("Wind gust", "chart7", data, "wind_gust", "#2F4F4F");               index++;
      createLineChart("Wind speed count", "chart8", data, "wind_speed_count", "#2F4F4F"); index++;
      createLineChart("Wind direction", "chart4", data, "wind_direction", "#2F4F4F");     

      index = 0;
      console.log("All charts are created.");
    },
    error: function (data) {
      console.log("GET failed. Failed to retrieve data therefore graphs not shown..");
      console.log(data);
    }
  });
}

function updateCharts(parsedInterval, isRefreshAllowed) {
  refreshAllowed = isRefreshAllowed;
  interval = parsedInterval;
  var data = {};
  $.ajax({
    url: "http://35.187.40.70/project/src/dbconfig.php?interval="+interval,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("GET success. Data retrieved charts will be updated.");
      //console.log(data);
      setLatestValues(data);

      var measurementTime = [];
      var bar_pressure = [];
      var temperature = [];
      var humidity = [];
      var rain = [];
      var input_voltage = [];
      var wind_gust = [];
      var wind_speed = [];
      var wind_speed_count = [];
      var wind_direction = [];

      var pointsDrawn = 0;
      console.log("Point count: " + data.length);

      for (var j=0; j<data.length; j++) {
        measurementTime.push((data[j].measurement_time).substr(0, 16)); // nonemtas sekundes
        bar_pressure.push(data[j].bar_pressure);
        temperature.push(data[j].temperature);
        humidity.push(data[j].humidity);
        rain.push(data[j].rain);
        input_voltage.push(data[j].input_voltage);
        wind_speed.push(data[j].wind_speed);
        wind_speed_count.push(data[j].wind_speed_count);
        wind_direction.push(data[j].wind_direction);
        wind_gust.push(data[j].wind_gust);

        pointsDrawn++;
      }
      myCharts[0].data.datasets[0].data = bar_pressure;
      myCharts[1].data.datasets[0].data = temperature;
      myCharts[2].data.datasets[0].data = humidity;
      myCharts[3].data.datasets[0].data = rain;
      myCharts[4].data.datasets[0].data = input_voltage;
      myCharts[5].data.datasets[0].data = wind_speed;
      myCharts[6].data.datasets[0].data = wind_gust;
      myCharts[7].data.datasets[0].data = wind_speed_count;
      myCharts[8].data.datasets[0].data = wind_direction;


      for(var i=0; i<5; i++){
        myCharts[i].data.labels = measurementTime;
        myCharts[i].update();
      }
      console.log("All charts updated.");   
      console.log("Points drawn: "+ pointsDrawn);   
    },
    error: function (data) {
      console.log("GET failed. Failed to retrieve data therefore graphs not shown..");
      console.log(data);
    }
  });
}

function getMetric(yLabel) {
  switch (yLabel) {
    case "wind_speed":
    case "wind_gust":
      return "m/s";
    case "wind_speed_count":
      return "Count";
    case "rain":
      return "mm";
    case "input_voltage":
      return "Vdc";
    case "solar_radiation":
      return "W/m^2";
    case "temperature":
      return "°C";
    case "humidity":
      return "%";
    case "bar_pressure":
      return "mbar";
    default:
      return yLabel;
  }
}

function createLineChart(mainLabel, element, data, metricType, lineColor) {

  var measurementTime = [];
  var metric = [];

  for (var i in data) {
    measurementTime.push((data[i].measurement_time).substr(0, 16)); // nonemtas sekundes
    switch (metricType) {
      case "temperature":
        metric.push(data[i].temperature);
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
      default:
        metric.push(data[i].input_voltage);
    }
  }


  var canvas = document.getElementById(element);
  var ctx = canvas.getContext('2d');

  var chartdata = {
    labels: measurementTime,
    datasets: [{
      radius: 0, // radius is 0 for only this dataset
      label: mainLabel,
      borderColor: lineColor,
      borderWidth: 1.5, // and not lineWidth
      fill: true,
      data: metric
    }]
  };

  var options = {
    type: 'line',
    data: chartdata,
    options: {
      animation: {
        duration: 0
      },
      responsive: true,
      legend: {
        position: 'none',
        fullWidth: true
      },
      elements: {
        
        point: {
            hitRadius: 10, 
            hoverRadius: 10         
          }
      },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: true,
            maxTicksLimit: 3,
            'text-anchor': 'middle',
            maxRotation: 0,
            minRotation: 0
          },
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: false,
            labelString: "Laiks",
            fontSize: 14,
            fontColor: "black",
            fontStyle: "bold"
          }
        }],
        yAxes: [{
          // ticks: {
          //   //autoSkip: true,
          //   //stepSize: 1
          //   min: Math.ceil(Math.min.apply(Math, metric) - 1),
          //   max: Math.floor(Math.max.apply(Math, metric) + 1)
          // },
          scaleLabel: {
            display: true,
            labelString: getMetric(metricType),
            fontSize: 14,
            fontColor: "black",
            fontStyle: "bold"
          }
        }]
      },
      title: {
        display: true,
        text: mainLabel,
        fontSize: 15,
        fontColor: "black"
      }
    }
  }
  myCharts[index] = new Chart(ctx, options);
}

$(document).ready(function () {
  var now = moment().subtract(2, 'hour').format();
  var yesterday = moment().subtract(1, 'day').subtract(2, 'hour').format();
  document.getElementById("now").defaultValue = now.substr(0, 16);
  document.getElementById("yesterday").defaultValue = yesterday.substr(0, 16);
  createCharts();

  setInterval(function () {
    if(refreshAllowed){ // if refresh is not allowed (custom interval is set) then charts will not be updated (requests not sent)
      updateCharts(interval, true);
    }
    else{
      console.log("Refresh not allowed. Press on any preset interval to enable chart refresh.")
    }
  }, 1000 * 60); //60 seconds

});
