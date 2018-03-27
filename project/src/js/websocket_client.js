function Base64Decode(str) {
    if (!(/^[a-z0-9+/]+={0,2}$/i.test(str)) || str.length%4 != 0) throw Error('Not base64 string');

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, d=[];

    for (var c=0; c<str.length; c+=4) {  // unpack four hexets into three octets
        h1 = b64.indexOf(str.charAt(c));
        h2 = b64.indexOf(str.charAt(c+1));
        h3 = b64.indexOf(str.charAt(c+2));
        h4 = b64.indexOf(str.charAt(c+3));

        bits = h1<<18 | h2<<12 | h3<<6 | h4;

        o1 = bits>>>16 & 0xff;
        o2 = bits>>>8 & 0xff;
        o3 = bits & 0xff;

        d[c/4] = String.fromCharCode(o1, o2, o3);
        // check for padding
        if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
        if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
    }
    str = d.join('');  

    return str;
}

var ws = new WebSocket("wss://ws2s.feling.io/")
ws.onmessage = (event) => {
    var obj = JSON.parse(event.data);
    var jsonData = Base64Decode(obj.data);
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
    setElStowed('El_stowed-indicator',jsonDataArray);
    setEl_stow_preDn('El_stow_preDn-indicator', jsonDataArray);
    setEl_stow_preUp('El_stow_preUp-indicator', jsonDataArray);
    setEl_stow_posOk('El_stow_posOk-indicator', jsonDataArray);
    setElStowedPin1('El_stowPin1-indicator', jsonDataArray)
    setElStowedPin2('El_stowPin2-indicator', jsonDataArray)
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
