var jsonDataArray = {};
var eventSources = [];


function closeWebSockets() {
    eventSources.forEach(function(s) {
        s.close();
    });
    console.log("All event sources closed.");
}

function createWebSocket(desiredTelescope){
    
    if(typeof(EventSource) !== "undefined") {
        if(desiredTelescope == 2){
            var source = new EventSource("rt32_data_stream.php");
        }
        else{
            var source = new EventSource("rt16_data_stream.php");
        }
        eventSources.push(source);
        source.onmessage = function(event) {
            if (!event){
                source.close();
            }
            else{
                var obj = JSON.parse(event.data);
        
                if(obj.AzEl_pos.length > 1){
                    document.getElementById('container').style.visibility='hidden';
                    document.getElementById('acu-params').style.visibility='visible';
                    document.getElementById('show-error').style.visibility='visible';
                    document.getElementById('show-status').style.visibility='visible';
                    setAzElValues(obj);
                }
            }
        };
    } else {
        console.log("Sorry, your browser does not support server-sent events...");
    }
};

function showRT16(){
    $('#acu-heading').text('ACU data for RT16');
    document.getElementById("acu-error").innerHTML = "";
    document.getElementById('rt16button').style.opacity=1;
    document.getElementById('rt32button').style.opacity=0.5;
    closeWebSockets();
    document.getElementById('container').style.visibility='visible';
    document.getElementById('acu-params').style.visibility='hidden';
    document.getElementById('show-error').style.visibility='hidden';
    document.getElementById('show-status').style.visibility='hidden';
    createWebSocket(1);
}
function showRT32(){
    $('#acu-heading').text('ACU data for RT32');
    document.getElementById("acu-error").innerHTML = "";
    document.getElementById('rt32button').style.opacity=1;
    document.getElementById('rt16button').style.opacity=0.5;
    closeWebSockets();
    document.getElementById('container').style.visibility='visible';
    document.getElementById('acu-params').style.visibility='hidden';
    document.getElementById('show-error').style.visibility='hidden';
    document.getElementById('show-status').style.visibility='hidden';
    createWebSocket(2);
}