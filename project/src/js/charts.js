var index = 0;
var myCharts = [];
var interval;

function changeInterval(value){
  interval = value;
  updateCharts(interval);
}

function createCharts() {
  var data = {};
  $.ajax({
    url: "http://35.187.40.70/project/src/dbconfig.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("GET success. Data retrieved and charts ready to be created.");
      console.log(data);

      createLineChart("Atmosfēras spiediens", 'chart1', data, "bar_pressure", "#0000FF"); index++;
      createLineChart("Temperatūra", "chart2", data, "temperature", "#CC0000");           index++;
      createLineChart("Gaisa mitrums", "chart3", data, "humidity", "#008000");            index++;
      createLineChart("Nokrišņi", "chart4", data, "rain", "#191970");                     index++;
      createLineChart("Ieejas strāva", "chart5", data, "input_voltage", "#2F4F4F");
      index = 0;
      console.log("All charts are created.");
    },
    error: function (data) {
      console.log("GET failed. Failed to retrieve data therefore graphs not shown..");
      console.log(data);
    }
  });
}

function updateCharts(parsedInterval) {
  interval = parsedInterval;
  var data = {};
  $.ajax({
    url: "http://35.187.40.70/project/src/dbconfig.php?interval="+interval,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("GET success. Data retrieved charts will be updated.");
      console.log(data);

      var measurementTime = [];
      var bar_pressure = [];
      var temperature = [];
      var humidity = [];
      var rain = [];
      var input_voltage = [];
	var dataCount = data.length;
	var step = Math.floor((dataCount / 720));
	
	for(var j = 0; j<data.length; j++){
	        measurementTime.push((data[j].measurement_time).substr(0, 16)); // nonemtas sekundes
        	bar_pressure.push(data[j].bar_pressure);
       		temperature.push(data[j].temperature);
        	humidity.push(data[j].humidity);
        	rain.push(data[j].rain);
        	input_voltage.push(data[j].input_voltage);
	}

      
	console.log(i);
      myCharts[0].data.datasets[0].data = bar_pressure;
      myCharts[1].data.datasets[0].data = temperature;
      myCharts[2].data.datasets[0].data = humidity;
      myCharts[3].data.datasets[0].data = rain;
      myCharts[4].data.datasets[0].data = input_voltage;

      for(var i=0; i<5; i++){
        myCharts[i].data.labels = measurementTime;
        myCharts[i].update();
      }
      console.log("All charts updated.");      
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
      default:
        metric.push(data[i].input_voltage);
    }
  }

  var ctx = $("#" + element);

  var chartdata = {
    labels: measurementTime,
    datasets: [{
      label: mainLabel,
      borderColor: lineColor,
      //borderWidth: 1.4, // and not lineWidth
      fill: false,
      //lineTension: 0.1,
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
        position: 'right',
        fullWidth: true
      },
      // elements: {
      //   point: {
      //   pointRadius: 0.2,
      //   pointHoverRadius: 1
      //   radius: 0 // punkta lielums
      //   }
      // },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: true,
            maxTicksLimit: 3,
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
    updateCharts(interval);
  }, 1000 * 60); //60 sekundes
});
