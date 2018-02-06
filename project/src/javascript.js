$(document).ready(function(){
    var now = moment().subtract(2, 'hour').format();
    var yesterday = moment().subtract(1, 'day').subtract(2, 'hour').format();
    document.getElementById("now").defaultValue = now.substr(0, 16);
    document.getElementById("yesterday").defaultValue = yesterday.substr(0, 16);
});

function getMetric(yLabel){
    switch(yLabel) {
        case "wind_speed":
        case "wind_gust":       return "m/s";
        case "wind_speed_count":return "Count";
        case "rain":            return "mm";
        case "input_voltage":   return "Vdc";
        case "solar_radiation": return "W/m^2";
        case "temperature":     return "°C";
        case "humidity":        return "%";
        case "bar_pressure":    return "mbar";
        default:                return yLabel;
    }
}

function createLineChart(chartType, canvasElement, xDataArray, yDataArray, mainLabel, lineColor, xLabel, yLabel) {
    var ctx = document.getElementById(canvasElement).getContext("2d");
    var pixelRatio = window.devicePixelRatio || 1;

    ctx.canvas.width = 404 / pixelRatio;
    ctx.canvas.height = 250  / pixelRatio;    

    var cfg = {
        type: chartType,
        showXLabels: 10,
            data: {
            labels: xDataArray,         //x axis data
            datasets: [{
                borderWidth: 1.4, // and not lineWidth
                data: yDataArray,       // y axis data
                label: yLabel,  
                borderColor: lineColor,
                fill: false
            },]},
            options: {
                responsive: true,
                
                legend: {
                    position: 'right',
                    fullWidth:true
                },
                elements: {
                    point:{
                        radius: 0 // punkta lielums
                    }
                },
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
                            labelString: xLabel,
                            fontSize: 14,
                            fontColor: "black",                            
                            fontStyle: "bold"
                        }
                    }],
                    yAxes: [{
                         ticks: {
                            //autoSkip: true,
                            //stepSize: 1
                             min: Math.ceil(Math.min.apply(Math, yDataArray)-1),
                             max: Math.floor(Math.max.apply(Math, yDataArray)+1)
                         },
                        scaleLabel: {
                            display: true,
                            labelString: getMetric(yLabel),
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
    };
    return new Chart(ctx, cfg);
}
