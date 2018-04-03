
var jsonDataArray = {};


// local start

//static ACU sample data for testing
// var tempoData = {
//     "AzEl_pos":         [194.99942176043947, 90.0313989371059], 
//     "AzEl_vel":         [-6.547118988327969e-07, -1.2763370928963063e-07], 
//     "El_stowed":        1, 
//     "El_stowPin1":      1, 
//     "El_stowPin2":      1, 
//     "El_stow_posOk":    1, 
//     "trTable_index":    [1, 0], 
//     "El_stow_preDn":    0, 
//     "AzEl_state":       [0, 0], 
//     "AzEl_pOffs":       [0.0, 0.0], 
//     "offTable_index":   [1, 0], 
//     "El_stow_preUp":    0, 
//     "AzEl_trOffs":      [0.0, 0.0], 
//     "AzEl_des":         [194.99942176043947, 90.0313989371059]
// }

// document.getElementById('container').style.visibility='hidden';
// document.getElementById('acu-params').style.visibility='visible';
// setAzElValues(tempoData);
// console.log("ACU updated.");
// local end


var ws = new WebSocket("wss://ws2s.feling.io/")
ws.onmessage = (event) => {
    var obj = JSON.parse(event.data);
    var jsonData = Base64Decode(obj.data);
    console.log(jsonData);
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
    console.log("ACU updated.");
    //public end
}
ws.onopen = () => {
    console.log("onopen");
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
    console.log("onclose");
}
