var jsonDataArray = {};
// local start
//static ACU sample data for testing
// var tempoData = {
//     "AzEl_pos": [194.99945931136568, 90.02936448156811], 
//     "AzEl_vel": [-3.2261574817743836e-07, 2.038350677262439e-07],
//     "El_stowed": 1, 
//     "El_stowPin1": 1, 
//     "El_stowPin2": 1, 
//     "El_stow_posOk": 1, 
//     "trTable_index": [1, 0], 
//     "El_stow_preDn": 0, 
//     "AzEl_state": [0, 0], 
//     "AzEl_pOffs": [0.0, 0.0], 
//     "schedule": ["station", "", 0],
//     "offTable_index": [1, 0], 
//     "El_stow_preUp": 0, 
//     "AzEl_trOffs": [0.0, 0.0], 
//     "AzEl_des": [194.99945931136568, 90.02936448156811]
// }

// document.getElementById('container').style.visibility='hidden';
// document.getElementById('acu-params').style.visibility='visible';
// setAzElValues(tempoData);
// printLog("ACU updated.");
// local end

function createWebSocket(){
    var ws = new WebSocket("wss://ws2s.feling.io/")
    printLog("WebSocket connected.")
    ws.onmessage = (event) => {
        var obj = JSON.parse(event.data);
        var jsonData = Base64Decode(obj.data);
        //printLog(jsonData);
        var jsonDataArray = $.parseJSON(jsonData);
        

        if(jsonData.length > 1){
            document.getElementById('container').style.visibility='hidden';
            document.getElementById('acu-params').style.visibility='visible';
        }
        else{
            $("#acu-error").append("<strong> Websocket error: </strong> "+ jsonData + "<br />");
        }

        //public start
        setAzElValues(jsonDataArray);
        //printLoglog("ACU updated.");
        //public end
    }
    ws.onopen = () => {
        printLog("onOpen called");
        ws.send(JSON.stringify(
            {
                command: "connect",
                host: "193.105.155.166",
                port: 8888
            }
        ))
        ws.send(JSON.stringify(
            {
                command: "send",
                data: "GET / HTTP/1.1\r\nHost: feling.io\r\nConnection: close\r\n\r\n"
            }
        ))
    }
    ws.onclose = () => {
        printLog("OnClose called");
        printLog("Seocket will reconnect shortly");
        createWebSocket();
    }
}

createWebSocket();