var tempData = {
    "AzEl_pos":         [194.99942176043947, 90.0313989371059], 
    "AzEl_vel":         [-6.547118988327969e-07, -1.2763370928963063e-07], 
    "El_stowed":        1, 
    "El_stowPin1":      1, 
    "El_stowPin2":      1, 
    "El_stow_posOk":    1, 
    "trTable_index":    [1, 0], 
    "El_stow_preDn":    0, 
    "AzEl_state":       [0, 0], 
    "AzEl_pOffs":       [0.0, 0.0], 
    "offTable_index":   [1, 0], 
    "El_stow_preUp":    0, 
    "AzEl_trOffs":      [0.0, 0.0], 
    "AzEl_des":         [194.99942176043947, 90.0313989371059]
}

//TODO šeit jānomaina tempData (statisks json mainīgais) uz data (dinamsiski websocketa dati) visām metodēm lejā
function setAzElValues(data){
    document.getElementById("Az_des_pos_vel").innerHTML = "<strong> RT32 Azimuth </strong>";
    document.getElementById("Az_des").innerHTML = data.AzEl_des[0];
    document.getElementById("Az_pos").innerHTML = data.AzEl_pos[0];
    document.getElementById("Az_vel").innerHTML = data.AzEl_vel[0];

    document.getElementById("El_des_pos_vel").innerHTML = "<strong> RT32 Elevation </strong>";
    document.getElementById("El_des").innerHTML = data.AzEl_des[1];
    document.getElementById("El_pos").innerHTML = data.AzEl_pos[1];
    document.getElementById("El_vel").innerHTML = data.AzEl_vel[1];
    
    document.getElementById("AzOffsets").innerHTML = "<strong> Azimuth offsets </strong>";
    document.getElementById("Az_pOffs").innerHTML = data.AzEl_pOffs[0];
    document.getElementById("Az_trOffs").innerHTML = data.AzEl_trOffs[0];

    document.getElementById("ElOffsets").innerHTML = "<strong> Elevation offsets </strong>";
    document.getElementById("El_pOffs").innerHTML = data.AzEl_pOffs[1];
    document.getElementById("EL_trOffs").innerHTML = data.AzEl_trOffs[1];

    // reversed
    document.getElementById("trTable_index").innerHTML ="<strong>Track table index: </strong>" +data.trTable_index[1] + " (out of "+data.trTable_index[0] + ")";
    document.getElementById("offTable_index").innerHTML ="<strong>Offset table index: </strong>" +data.offTable_index[1] + " (out of "+data.offTable_index[0] + ")";


    setElStowed('El_stowed-indicator',data);
    setEl_stow_preDn('El_stow_preDn-indicator', data);
    setEl_stow_preUp('El_stow_preUp-indicator', data);
    setEl_stow_posOk('El_stow_posOk-indicator', data);
    setElStowedPin1('El_stowPin1-indicator', data)
    setElStowedPin2('El_stowPin2-indicator', data)
    setAzAxisState(data);
    setElAxisState(data);

}

function setElStowed(div, data){
    if(data.El_stowed == 1){
        $('#'+div).css('background-color', 'green');
    }
    else if(data.El_stowed == 0){
        $('#'+div).css('background-color', 'red ');
    }
    else{
        $('#'+div).css('background-color', 'yellow');
    }
}

function setElStowedPin1(div, data){
    if(data.El_stowPin1 == 1){
        $('#'+div).css('background-color', 'green');
    }
    else if(data.El_stowPin1 == 0){
        $('#'+div).css('background-color', 'red ');
    }
    else{
        $('#'+div).css('background-color', 'yellow');
    }
}

function setElStowedPin2(div, data){
    if(data.El_stowPin2 == 1){
        $('#'+div).css('background-color', 'green');
    }
    else if(data.El_stowPin2 == 0){
        $('#'+div).css('background-color', 'red ');
    }
    else{
        $('#'+div).css('background-color', 'yellow');
    }
}

function setEl_stow_posOk(div, data){
    if(data.El_stow_posOk == 1){
        $('#'+div).css('background-color', 'green');
    }
    else if(data.El_stow_posOk == 0){
        $('#'+div).css('background-color', 'red ');
    }
    else{
        $('#'+div).css('background-color', 'yellow');
    }
}

function setEl_stow_preDn(div, data){
    if(data.El_stow_preDn == 1){
        $('#'+div).css('background-color', 'green');
    }
    else if(data.El_stow_preDn == 0){
        $('#'+div).css('background-color', 'red ');
    }
    else{
        $('#'+div).css('background-color', 'yellow');
    }
}

function setEl_stow_preUp(div, data){
    if(data.El_stow_preUp == 1){
        $('#'+div).css('background-color', 'green');
    }
    else if(data.El_stow_preUp == 0){
        $('#'+div).css('background-color', 'red ');
    }
    else{
        $('#'+div).css('background-color', 'yellow');
    }
}
function setAzAxisState(data){
    if(data.AzEl_state[0] == 0){
        $('#Az-state-indicator').css('background-color', 'grey ');
    }
    else if(data.AzEl_state[0] == 1){
        $('#Az-state-indicator').css('background-color', 'orange');
    }
    else if(data.AzEl_state[0] == 2){
        $('#Az-state-indicator').css('background-color', 'yellow');
    }
    else if(data.AzEl_state[0] == 3){
        $('#Az-state-indicator').css('background-color', 'green');
    }
    else{
        $('#Az-state-indicator').css('background-color', 'red');
    }
}
function setElAxisState(data){
    if(data.AzEl_state[1] == 0){
        $('#El-state-indicator').css('background-color', 'grey ');
    }
    else if(data.AzEl_state[1] == 1){
        $('#El-state-indicator').css('background-color', 'orange');
    }
    else if(data.AzEl_state[1] == 2){
        $('#El-state-indicator').css('background-color', 'yellow ');
    }
    else if(data.AzEl_state[1] == 3){
        $('#El-state-indicator').css('background-color', 'green ');
    }
    else{
        $('#El-state-indicator').css('background-color', 'red');
    }
}

