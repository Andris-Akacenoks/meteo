
var jsonDataArray = {};
/*

    Local enviroment below: static JSON data


    document.getElementById('container').style.visibility='hidden';
    document.getElementById('acu-params').style.visibility='visible';
    setAzElValues(jsonDataArray);
    console.log("ACU updated.");
*/


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

    // document.getElementById("streamed-data").innerHTML = jsonData;
    setAzElValues(jsonDataArray);
    console.log("ACU updated.");
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
