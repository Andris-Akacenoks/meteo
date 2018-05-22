function displayRxcStatus(data){
    if(data.hasOwnProperty('rxc_status')){
        // call all seperate functions
        displaySystemStatus(data);
        displayTemperatureForA(data);
        displayTemperatureForB(data);
        displayWorkingFrequency(data);
        displayGeneratorFrequency(data);
        displayVacuumLevel(data);
        displayOnOff(data);
        if ( $('#alarm-contents').css('display') != 'none' ){
            displayAlarmRegistry(data);
        }
        displayHornPos(data);

    }
    

 }

 // 0 element
 function displaySystemStatus(data){
    document.getElementById("rxc-system-status-label").innerHTML = "<strong> RXC system status </strong>";

    var statusCode = data.rxc_status[0];
    var statusMessage = "";

    switch(statusCode){
        case '0':
            statusMessage = "STANDBY";
            break;
        case '1':
            statusMessage = "HEATING";
            break;
        case '2':
            statusMessage = "STOPPING COOLING";
            break;
        case '3':
            statusMessage = "START_COOLING_H";
            break;
        case '4':
            statusMessage = "COOLING_H";
            break;
        case '5':
            statusMessage = "COOLING_L";
            break;
        case '6':
            statusMessage = "READY TO USE ";
            break;
        default:
            statusMessage = "UNKNOWN";
    }
    document.getElementById("rxc-system-status").innerHTML = statusMessage;
 }

// 1st element
function displayTemperatureForA(data){
    document.getElementById("rxc-temperature-a-label").innerHTML = "<strong> Sensor A Temperature </strong>";
    var temperature = parseInt(data.rxc_status[1]);

    if(isNaN(temperature)){
        document.getElementById("rxc-temperature-a").innerHTML = data.rxc_status[1];
    }
    else{
        if(temperature > 20){
            document.getElementById("rxc-temperature-a").style.color = "red";
        }
        document.getElementById("rxc-temperature-a").innerHTML = temperature + " K";;
    }
}

// 2nd element
function displayTemperatureForB(data){
    document.getElementById("rxc-temperature-b-label").innerHTML = "<strong> Sensor B Temperature </strong>";
    var temperature = parseInt(data.rxc_status[2]);

    if(isNaN(temperature)){
        document.getElementById("rxc-temperature-b").innerHTML = data.rxc_status[2];
    }
    else{
        if(temperature > 20){
            document.getElementById("rxc-temperature-b").style.color = "red";
        }
        document.getElementById("rxc-temperature-b").innerHTML = temperature + " K";
    }
} 

// 3rd element
function displayWorkingFrequency(data){
    document.getElementById("rxc-frequency-label").innerHTML = "<strong> Working Frequency </strong>";
    document.getElementById("rxc-frequency").innerHTML = data.rxc_status[3]+" MHz";
}

// 4th element
function displayGeneratorFrequency(data){
    document.getElementById("rxc-oscilator-label").innerHTML = "<strong> Local Oscilator Frequency </strong>";
    document.getElementById("rxc-oscilator").innerHTML = data.rxc_status[4]+" MHz";
}

// 5th element
function displayVacuumLevel(data){
    document.getElementById("rxc-vacuum-label").innerHTML = "<strong> Vacuum level </strong>";
    var statusMessage = "";

        switch(data.rxc_status[4]){
            case 'Underrange':
                statusMessage = "UNDER";
                break;
            case 'Overrange':
                statusMessage = "OVER";
                break;
            case 'SENERR (sensor error)':
                statusMessage = "ERROR";
                break;
            case 'Sensor OFF':
                statusMessage = "SENOFF ";
                break;
            case 'No sensor':
                statusMessage = "NOSEN";
                break;
            case 'ID error':
                statusMessage = "IDERR";
                break;
            default:
                statusMessage = data.rxc_status[5] + " mbar";
        }
        document.getElementById("rxc-vacuum").innerHTML = statusMessage;
}

// 6th element
function dec2hex(i) {
    return i.toString(16).toUpperCase();
}

function getStatus(first, second){
    if((currentStatus && dryAir) == true){
        return true;
    }
    else return false;
}

function displayOnOff(data){


    setOnOffDeviceNames();
    var currentStatus = dec2hex(data.rxc_status[6]);

    yourNumber = parseInt("0x00000100", 16);

    var dryAir =            0x00000001;
    var cryostatHeating =   0x00000002;
    var noiseSource =       0x00000004;
    var phaseCal =          0x00000008;
    var compressor =        0x00000010;
    var vacuumPump =        0x00000020;
    var vacuumValve =       0x00000040;
    var signalGenerator =   0x00000080;
    var motor =             0x00000100;

    setOnOffState((currentStatus && dryAir), 1);
    setOnOffState((currentStatus && cryostatHeating), 2);
    setOnOffState((currentStatus < noiseSource), 3);
    setOnOffState((currentStatus && phaseCal), 4);
    setOnOffState((currentStatus > compressor), 5);
    setOnOffState((currentStatus < vacuumPump), 6);
    setOnOffState((currentStatus && vacuumValve), 7);
    setOnOffState((currentStatus && signalGenerator), 8);
    setOnOffState((currentStatus && motor), 9);
}

// 7th element
function displayAlarmRegistry(data){
    var currentStatus = data.rxc_status[8];

    var errors = [
        {
            message: "NO alarm",
            code: 0x00000000,
        },{
            message: "Vacuum temp",
            code: 0x00000001,
        },{
            message: "Operating temp",
            code: 0x00000002,
        },{
            message: "Communication with the motor",
            code: 0x00000004,
        },{
            message: "Communication with the signal generator",
            code: 0x00000008,
        },{
            message: "Communication with the temp sensor A",
            code: 0x00000010,
        },{
            message: "Communication with the temp sensor B",
            code: 0x00000020,
        },{
            message: "Communication with the temp vacuum sensor",
            code: 0x00000040,
        },{
            message: "Feeder end switch",
            code: 0x00000080,
        },{
            message: "Feeder home switch",
            code: 0x00000100,
        },{
            message: "Low vacuum level",
            code: 0x00000200,
        },{
            message: "Communication I2C bus",
            code: 0x00000400,
        },{
            message: "Signal Generator External Reference",
            code: 0x00000200,
        },{
            message: "Motor movement timeout",
            code: 0x00001000,
        },{
            message: "Phase Cal High Temperature",
            code: 0x00002000,
        },{
            message: "Phase Cal Low Temperature",
            code: 0x00004000,
        },{ 
            message: "Signal Generator Params",
            code: 0x00008000,
        },{
            message: "MCU flash",
            code: 0x20000000,
        },{
            message: "MCU Parameters",
            code: 0x40000000,
        }
    ];

    for(var i=1; i< errors.length; i++){
        setAlarmState(((errors[i].code > currentStatus)), i, errors[i].message);
    }
}

// 8th element
function displayHornPos(data){
    document.getElementById("rxc-horn-pos-label").innerHTML = "Reciever Horn position";
    document.getElementById("rxc-horn-pos").innerHTML = data.rxc_status[8]+" mm";
}

 // if isRed == true then alarm is active
function setAlarmState(isRed, alarmID, msg){
    document.getElementById("rxc-alarm-text-"+alarmID).innerHTML = msg;

    if(isRed){
        document.getElementById("rxc-alarm-"+alarmID).style.visibility = "visible";
        document.getElementById("rxc-alarm-"+alarmID).style.background = "red";
        document.getElementById("rxc-alarm-"+alarmID).style.background = "linear-gradient(to bottom right, grey, red)";
    }
    else{
        document.getElementById("alarm-text-ind-"+alarmID).remove();
        // document.getElementById("rxc-alarm-"+alarmID).remove();
        // document.getElementById("rxc-alarm-"+alarmID).style.visibility = "visible";
        // document.getElementById("rxc-alarm-"+alarmID).style.background = "grey";
        // document.getElementById("rxc-alarm-"+alarmID).style.background = "linear-gradient(to bottom right, grey, white)"; 
        
    }
}

function setOnOffState(isOn, indicatorID){
    if(isOn){
        $('#btn-'+indicatorID).css('background-image', 'linear-gradient(to right, #00b300 0%, #006400 51%, #00b300 100%)');
        document.getElementById("btn-"+indicatorID).innerHTML = "ON";
    }
    else{
        $('#btn-'+indicatorID).css('background-image', 'linear-gradient(to right, #666666 0%, #b3b3b3 51%, #666666 100%)');
        document.getElementById("btn-"+indicatorID).innerHTML = "OFF";
    }
}

function setOnOffDeviceNames(){
    var names = [
        "Dry Air",
        "Cryostat Heating",
        "Noise Source",
        "Phase Cal",
        "Compressor",
        "Vacuum Pump",
        "Vacuum Valve",
        "Signal Generator",
        "Motor"
    ];
    for(var i=0; i<names.length; i++){
        document.getElementById("onoff-name-"+(i+1)).innerHTML = names[i];
    }
}
