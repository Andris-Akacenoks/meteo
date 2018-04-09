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

var testData = 
{"acuErr": 
[
    "\r\n", "2018-04-09T12-55-54\r\n", 
    "no PPS signal received\r\n", 
    "\r\n", "The ACU detected a power failure on its supply power. The system will automatically shut down!\r\n", 
    "\r\n", "At least one emergency stop button is activated. The information about the active emergency buttons can be found in chapter 4.2.7 Bit mode coded emergency\r\n", 
    "\r\n", "Safety Project deactivated\r\n", 
    "\r\n", "E-Stop at Door Access CC\r\n", 
    "\r\n", "At least one E-Stop is active\r\n", 
    "\r\n", "The AZ axis is in error condition and an emergency stop is executed.\r\n", 
    "\r\n", "The EL axis is in error condition and an emergency stop is executed.\r\n",
    "\r\n", "At least one error is set for AZ axis\r\n", 
    "\r\n", "AZ: At least one of the safety project reports an failure, please refer to Beckhoff documentation EL6904, EL1904, EL2904\r\n", 
    "\r\n", "AZ: At least on emergency stop button is activated. For the emergency stop buttons please refer to chapter 4.2.7 Bit mode coded emergency stops\r\n", 
    "\r\n", "At least one error is set for EL axis\r\n", 
    "\r\n", "EL: At least one of the safety project reports an failure, please refer to Beckhoff documentation EL6904, EL1904, EL2904\r\n", 
    "\r\n", "EL: At least on emergency stop button is activated. For the emergency stop buttons please refer to chapter 4.2.7 Bit mode coded emergency stops\r\n", 
    "\r\n", "The actual tracking object reports an error\r\n", 
    "\r\n", "The tracking has reached its last table entry, the output of the function is the position of the last table entry\r\n", 
    "\r\n"
], 
"AzEl_pos": [230.90542294084986, 90.01860010623909], 
"AzEl_vel": [-8.024727909322558e-08, -3.279496709152567e-07], 
"El_stowed": 1, 
"El_stowPin1": 1, 
"El_stowPin2": 1, 
"El_stow_posOk": 1, 
"trTable_index": [9440, 9440], 
"El_stow_preDn": 0, 
"AzEl_state": [0, 0], 
"AzEl_pOffs": [0.0, 0.0], 
"schedule": ["dummy", "", 0], 
"fsErr": 
    ["sterp:2017.340.10:58:41.92?ERROR AN   -5 Error return from antenna.\n"], 
"offTable_index": [1, 0], 
"El_stow_preUp": 0, 
"AzEl_trOffs": [0.0, 0.0],
"AzEl_des": [230.90542294084986, 90.01860010623909]}

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
        //printLog("ACU updated.");
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