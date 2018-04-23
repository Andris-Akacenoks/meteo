var currentDate = new Date();
var utcDate = currentDate.toUTCString();

function setAzElValues(data){
    document.getElementById("Az_des_pos_vel").innerHTML = "<strong> RT32 Azimuth </strong>";
    document.getElementById("Az_des").innerHTML = data.AzEl_des[0].toFixed(6) + "&deg;";
    document.getElementById("Az_pos").innerHTML = data.AzEl_pos[0].toFixed(6) + "&deg;";
    document.getElementById("Az_vel").innerHTML = data.AzEl_vel[0].toFixed(6) + "&deg;/s";

    document.getElementById("El_des_pos_vel").innerHTML = "<strong> RT32 Elevation </strong>";
    document.getElementById("El_des").innerHTML = data.AzEl_des[1].toFixed(6) + "&deg;";
    document.getElementById("El_pos").innerHTML = data.AzEl_pos[1].toFixed(6) + "&deg;";
    document.getElementById("El_vel").innerHTML = data.AzEl_vel[1].toFixed(6) + "&deg;/s";
    
    document.getElementById("AzOffsets").innerHTML = "<strong> Azimuth offsets </strong>";
    document.getElementById("Az_pOffs").innerHTML = data.AzEl_pOffs[0].toFixed(6) + "&deg;";
    document.getElementById("Az_trOffs").innerHTML = data.AzEl_trOffs[0].toFixed(6) + "&deg;";

    document.getElementById("ElOffsets").innerHTML = "<strong> Elevation offsets </strong>";
    document.getElementById("El_pOffs").innerHTML = data.AzEl_pOffs[1].toFixed(6) + "&deg;";
    document.getElementById("EL_trOffs").innerHTML = data.AzEl_trOffs[1].toFixed(6) + "&deg;";

    // reversed
    document.getElementById("trTable_index").innerHTML ="<strong>Track table index: </strong>" +data.trTable_index[0] + " (out of "+data.trTable_index[1] + ")";
    document.getElementById("offTable_index").innerHTML ="<strong>Offset table index: </strong>" +data.offTable_index[0] + " (out of "+data.offTable_index[1] + ")";


    setElStowed('El_stowed-indicator',data);
    setEl_stow_preDn('El_stow_preDn-indicator', data);
    setEl_stow_preUp('El_stow_preUp-indicator', data);
    setEl_stow_posOk('El_stow_posOk-indicator', data);
    setElStowedPin1('El_stowPin1-indicator', data)
    setElStowedPin2('El_stowPin2-indicator', data)
    setAzAxisState(data);
    setElAxisState(data);
    setCurrentScheduledObs(data);
    
    displayFsError(data);
    displayAcuError(data);
}

function setElStowed(div, data){
    var status = "";
    if(data.El_stowed == 1){
        $('#'+div).css('background-color', 'green');
        document.getElementById("El-stowed-status").innerHTML = " <p><strong>Stowed</strong></p>";
    }
    else if(data.El_stowed == 0){
        $('#'+div).css('background-color', 'red ');
        document.getElementById("El-stowed-status").innerHTML = " <p><strong>Not stowed</strong></p>";
    }
    else{
        $('#'+div).css('background-color', '#DAA520');
        document.getElementById("El-stowed-status").innerHTML = " <p><strong>Unknown</strong></p>";
    }
}

function setElStowedPin1(div, data){
    if(data.El_stowPin1 == 1){
        $('#'+div).css('background-color', 'green');
        document.getElementById("El-stowPin1-status").innerHTML = " <p><strong>Stowed</strong></p>";
    }
    else if(data.El_stowPin1 == 0){
        $('#'+div).css('background-color', 'red ');
        document.getElementById("El-stowPin1-status").innerHTML = " <p><strong>Not stowed</strong></p>";
    }
    else{
        $('#'+div).css('background-color', '#DAA520');
        document.getElementById("El-stowPin1-status").innerHTML = " <p><strong>Unknown</strong></p>";
    }
}

function setElStowedPin2(div, data){
    if(data.El_stowPin2 == 1){
        $('#'+div).css('background-color', 'green');
        document.getElementById("El-stowPin2-status").innerHTML = " <p><strong>Stowed</strong></p>";
    }
    else if(data.El_stowPin2 == 0){
        $('#'+div).css('background-color', 'red ');
        document.getElementById("El-stowPin2-status").innerHTML = " <p><strong>Not stowed</strong></p>";
    }
    else{
        $('#'+div).css('background-color', '#DAA520');
        document.getElementById("El-stowPin2-status").innerHTML = " <p><strong>Unknown</strong></p>";

    }
}

function setEl_stow_posOk(div, data){
    if(data.El_stow_posOk == 1){
        $('#'+div).css('background-color', 'green');
        document.getElementById("El_stow_posOk-status").innerHTML = " <p><strong>Reached</strong></p>";

    }
    else if(data.El_stow_posOk == 0){
        $('#'+div).css('background-color', 'red ');
        document.getElementById("El_stow_posOk-status").innerHTML = " <p><strong>Not reached</strong></p>";
    }
    else{
        $('#'+div).css('background-color', '#DAA520');
        document.getElementById("El_stow_posOk-status").innerHTML = " <p><strong>Unknown</strong></p>";
    }
}

function setEl_stow_preDn(div, data){
    if(data.El_stow_preDn == 1){
        $('#'+div).css('background-color', 'red');
        document.getElementById("El_stow_preDn-status").innerHTML = " <p><strong>Reached</strong></p>";
    }
    else if(data.El_stow_preDn == 0){
        $('#'+div).css('background-color', 'green ');
        document.getElementById("El_stow_preDn-status").innerHTML = " <p><strong>Not reached</strong></p>";
    }
    else{
        $('#'+div).css('background-color', '#DAA520');
        document.getElementById("El_stow_preDn-status").innerHTML = " <p><strong>Unknown</strong></p>";
    }
}

function setEl_stow_preUp(div, data){
    if(data.El_stow_preUp == 1){
        $('#'+div).css('background-color', 'red');
        document.getElementById("El_stow_preUp-status").innerHTML = " <p><strong>Reached</strong></p>";
    }
    else if(data.El_stow_preUp == 0){
        $('#'+div).css('background-color', 'green ');
        document.getElementById("El_stow_preUp-status").innerHTML = " <p><strong>Not reached</strong></p>";
    }
    else{
        $('#'+div).css('background-color', '#DAA520');
        document.getElementById("El_stow_preUp-status").innerHTML = " <p><strong>Unknown</strong></p>";
    }
}

function setAzAxisState(data){
    if(data.AzEl_state[0] == 0){
        $('#Az-state-indicator').css('background-color', 'grey ');
        document.getElementById("Az-state-status").innerHTML = " <p><strong>Inactive</strong></p>";
    }
    else if(data.AzEl_state[0] == 1){
        $('#Az-state-indicator').css('background-color', 'orange');
        document.getElementById("Az-state-status").innerHTML = " <p><strong>Deactivating</strong></p>";
    }
    else if(data.AzEl_state[0] == 2){
        $('#Az-state-indicator').css('background-color', 'yellow');
        document.getElementById("Az-state-status").innerHTML = " <p><strong>Activating</strong></p>";
    }
    else if(data.AzEl_state[0] == 3){
        $('#Az-state-indicator').css('background-color', 'green');
        document.getElementById("Az-state-status").innerHTML = " <p><strong>Active</strong></p>";

    }
    else{
        $('#Az-state-indicator').css('background-color', 'red');
        document.getElementById("Az-state-indicator").innerHTML = " <p><strong>Error</strong></p>";
    }
}
function setElAxisState(data){
    if(data.AzEl_state[1] == 0){
        $('#El-state-indicator').css('background-color', 'grey ');
        document.getElementById("El-state-status").innerHTML = " <p><strong>Inactive</strong></p>";
    }
    else if(data.AzEl_state[1] == 1){
        $('#El-state-indicator').css('background-color', 'orange');
        document.getElementById("El-state-status").innerHTML = " <p><strong>Deactivating</strong></p>";
    }
    else if(data.AzEl_state[1] == 2){
        $('#El-state-indicator').css('background-color', 'yellow ');
        document.getElementById("El-state-status").innerHTML = " <p><strong>Activating</strong></p>";
    }
    else if(data.AzEl_state[1] == 3){
        $('#El-state-indicator').css('background-color', 'green ');
        document.getElementById("El-state-status").innerHTML = " <p><strong>Active</strong></p>";
    }
    else{
        $('#El-state-indicator').css('background-color', 'red');
        document.getElementById("El-state-status").innerHTML = " <p><strong>Error</strong></p>";
    }
}

function setCurrentScheduledObs(data){

    if(data.schedule[2] == 0){
        if((data.schedule[0] == data.schedule[1]) && data.schedule[0] != ""){
            // noverojums notiek (iekrasot zallaa)
            document.getElementById("acu-error").innerHTML =utcDate+"<strong> Experiment is in progress: "+data.schedule[0]+" </strong><br />";
        }
        else if((data.schedule[0] == "" || data.schedule[0] == "station") && (data.schedule[1] == "")){
            document.getElementById("acu-error").innerHTML =utcDate+"<strong> No experiment is scheduled now. </strong><br />";
        }
        else if(data.schedule[0] == ""){
            document.getElementById("acu-error").innerHTML =utcDate+"<strong> Field system is not running. </strong><br />";
        }
        else if(data.schedule[0] == "station"){
            document.getElementById("acu-error").innerHTML = utcDate+"<strong> Field system is running, no experiment is scheduled right now. </strong><br />";
        }
        else{
            document.getElementById("acu-error").innerHTML = utcDate+"<strong> Experiment running: "+data.schedule[0]+"  </strong><br />";
        }
    }
    else if(data.schedule[2] == -1){
        document.getElementById("acu-error").innerHTML =utcDate+"<strong> Scheduled experiment is not set up in FS. Experiment: "+data.schedule[1]+" </strong><br />";
        // noverojums nav palaists FS (iekrasot sarkana)
    }
    else if(data.schedule[2] == -2){
        document.getElementById("acu-error").innerHTML =utcDate+"<strong> Experiment is scheduled but telescope is not moving. Experiment: "+data.schedule[1]+" </strong><br />";
    }
}


function displayFsError(data){
    document.getElementById("acu-error").innerHTML += "<br/>"+utcDate+"<strong> "+data.fsErr+" </strong>";

}

function displayAcuError(data){
    var old = JSON.stringify(data.acuErr);
    var newArray = JSON.parse(old); //convert back to array

    // If there are errors in ACU then display the errors
    if(newArray.length > 1){
        document.getElementById("acu-error").innerHTML += "<br/>"+utcDate+"<strong> ACU errors:<br />"+newArray+"</strong><br />";
        var output = document.getElementById("acu-error").innerHTML.replace(/,/g, ""); 
        output2 = output.replace(/\n/g, "<br />"); 
        document.getElementById("acu-error").innerHTML = output2;
    }

}
