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
        displayAlarmRegistry(data);
        displayHornPos(data);

    }
    else{
        showToast("RXC is not avaliable");
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
            document.getElementById("rxc-temperature-a").style.color = red;
        }
        document.getElementById("rxc-temperature-a").innerHTML = temperature;
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
            document.getElementById("rxc-temperature-b").style.color = red;
        }
        document.getElementById("rxc-temperature-b").innerHTML = temperature;
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
function displayOnOff(data){
    document.getElementById("rxc-onoff-label").innerHTML = "<strong> Sub System </strong>";
    var currentStatus = data.rxc_status[6];

    //console.log("0x"+currentStatus); // ???

    var dryAir =            0x00000001;
    var cryostatHeating =   0x00000002;
    var noiseSource =       0x00000004;
    var phaseCal =          0x00000008;
    var compressor =        0x00000010;
    var vacuumPump =        0x00000020;
    var vacuumValve =       0x00000040;
    var signalGenerator =   0x00000080;
    var motor =             0x00000100;

    document.getElementById("rxc-onoff-1").innerHTML = (currentStatus && dryAir)            ? "ON" : "OFF";
    document.getElementById("rxc-onoff-2").innerHTML = (currentStatus && cryostatHeating)   ? "ON" : "OFF";
    document.getElementById("rxc-onoff-3").innerHTML = (currentStatus && noiseSource)       ? "ON" : "OFF";
    document.getElementById("rxc-onoff-4").innerHTML = (currentStatus && phaseCal)          ? "ON" : "OFF";
    document.getElementById("rxc-onoff-5").innerHTML = (currentStatus && compressor)        ? "ON" : "OFF";
    document.getElementById("rxc-onoff-6").innerHTML = (currentStatus && vacuumPump)        ? "ON" : "OFF";
    document.getElementById("rxc-onoff-7").innerHTML = (currentStatus && vacuumValve)       ? "ON" : "OFF";
    document.getElementById("rxc-onoff-8").innerHTML = (currentStatus && signalGenerator)   ? "ON" : "OFF";
    document.getElementById("rxc-onoff-9").innerHTML = (currentStatus && motor)             ? "ON" : "OFF";
}

// 7th element
function displayAlarmRegistry(data){
    document.getElementById("rxc-alarms-label").innerHTML = "<strong> Alarms </strong>";
    document.getElementById("rxc-alarms").innerHTML = "";

    var currentStatus = data.rxc_status[8];

    var errors = [
        {
            message: "NO alarm",
            code: 0x00000000,
        },{
            message: "Vacuum temp alarm",
            code: 0x00000001,
        },{
            message: "Operating temp alarm",
            code: 0x00000002,
        },{
            message: "Communication with the motor alarm",
            code: 0x00000004,
        },{
            message: "Communication with the signal generator alarm",
            code: 0x00000008,
        },{
            message: "Communication with the temp sensor A alarm",
            code: 0x00000010,
        },{
            message: "Communication with the temp sensor B alarm",
            code: 0x00000020,
        },{
            message: "Communication with the temp vacuum sensor alarm",
            code: 0x00000040,
        },{
            message: "Feeder end switch alarm",
            code: 0x00000080,
        },{
            message: "Feeder home switch alarm",
            code: 0x00000100,
        },{
            message: "Low vacuum level alarm",
            code: 0x00000200,
        },{
            message: "Communication I2C bus alarm",
            code: 0x00000400,
        },{
            message: "Signal Generator External Reference",
            code: 0x00000200,
        },{
            message: "Motor movement timeout alarm",
            code: 0x00001000,
        },{
            message: "Phase Cal High Temperature alarm",
            code: 0x00002000,
        },{
            message: "Phase Cal Low Temperature alarm",
            code: 0x00004000,
        },{ 
            message: "Signal Generator Params alarm",
            code: 0x00008000,
        },{
            message: "MCU flash alarm",
            code: 0x20000000,
        },{
            message: "MCU Parameters alarm",
            code: 0x40000000,
        }
    ];

    for(var i=0; i< errors.length; i++){
        if((errors[i].code && currentStatus) == false){
            document.getElementById("rxc-alarms").innerHTML +=errors[i].message + "<br />";
        }
    }
}

// 8th element
function displayHornPos(data){
    document.getElementById("rxc-horn-pos-label").innerHTML = "<strong> Reciever Horn position </strong>";
    document.getElementById("rxc-horn-pos").innerHTML = data.rxc_status[8]+" mm";
}
