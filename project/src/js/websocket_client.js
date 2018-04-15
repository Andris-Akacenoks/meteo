var jsonDataArray = {};
var currentTelescope = 1; // 1 = RT32, 2 = RT16
var sockets = [];

function setCurrentTelescope(telescope){
    telescope = currentTelescope;
}

function closeWebSockets() {
    sockets.forEach(function(s) {
        s.close();
    });
    printLog("All websockets closed.");
}

function createWebSocket(desiredPort){
    var ws = new WebSocket("wss://ws2s.feling.io/");
    sockets.push(ws);
    printLog("WebSocket connected.");
    ws.onmessage = (event) => {
        var obj = JSON.parse(event.data);
        var jsonData = {};
        try {
            jsonData = Base64Decode(obj.data);
            var jsonDataArray = $.parseJSON(jsonData);
        }
        catch(error) {
            printLog(error);
        }

        if(jsonData.length > 1){
            document.getElementById('container').style.visibility='hidden';
            document.getElementById('acu-params').style.visibility='visible';
            document.getElementById('show-error').style.visibility='visible';
            setAzElValues(jsonDataArray);
        }
    }
    ws.onopen = () => {
        printLog("onOpen called");
        ws.send(JSON.stringify(
            {
                command: "connect",
                host: "193.105.155.166",
                port: desiredPort
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
        //printLog("Seocket will reconnect shortly");
        //createWebSocket(desiredPort);
    }
}

function showRT16(){
    $('#acu-heading').text('ACU data for RT16');
    document.getElementById('rt16button').style.opacity=1;
    document.getElementById('rt32button').style.opacity=0.5;
    closeWebSockets();
    document.getElementById('container').style.visibility='visible';
    document.getElementById('acu-params').style.visibility='hidden';
    document.getElementById('show-error').style.visibility='hidden';
    createWebSocket(8889);
}
function showRT32(){
    $('#acu-heading').text('ACU data for RT32');
    document.getElementById('rt32button').style.opacity=1;
    document.getElementById('rt16button').style.opacity=0.5;
    closeWebSockets();
    document.getElementById('container').style.visibility='visible';
    document.getElementById('acu-params').style.visibility='hidden';
    document.getElementById('show-error').style.visibility='hidden';
    createWebSocket(8888);
}