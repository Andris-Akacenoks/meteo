function createSeperateTable(dataType){
    var data = {};
    $.ajax({
      url: "http://35.187.40.70/project/src/dbconfig.php?interval=last12h",
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log("GET success. Data retrieved and chart ready to be created.");
        createScatterPlot(data, dataType);
        console.log("All charts are created.");
      },
      error: function (data) {
        console.log("GET failed. Failed to retrieve data therefore graphs not created.");
        console.log(data);
      }
    });
  }

  function createScatterPlot(data,metricType){
    var measurementTime = [];
    var metric = [];
  
    if(data.length > 0){
      for (var i in data) {
        measurementTime.push((data[i].measurement_time).substr(0, 16)); // nonemtas sekundes
        metric.push(data[i].humidity);
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
        name: 'Team A',
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
        title:'Humidity'
      };
      
      return Plotly.newPlot('ct-chart', data, layout);
  }
  