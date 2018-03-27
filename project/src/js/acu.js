function setAzElValues(data){
    document.getElementById("AzEl_pos").innerHTML = "<strong> AzEl_pos </strong>";
    document.getElementById("AzEl_pos_1").innerHTML = data.AzEl_pos[0];
    document.getElementById("AzEl_pos_2").innerHTML = data.AzEl_pos[1];

    document.getElementById("AzEl_vel").innerHTML = "<strong> AzEl_vel </strong>";
    document.getElementById("AzEl_vel_1").innerHTML = data.AzEl_vel[0];
    document.getElementById("AzEl_vel_2").innerHTML = data.AzEl_vel[1];

    document.getElementById("AzEl_des").innerHTML = "<strong> AzEl_des </strong>";
    document.getElementById("AzEl_des_1").innerHTML = data.AzEl_des[0];
    document.getElementById("AzEl_des_2").innerHTML = data.AzEl_des[1];

    document.getElementById("AzEl_state").innerHTML = "<strong> AzEl_state </strong>";
    document.getElementById("AzEl_state_1").innerHTML = data.AzEl_state[0];
    document.getElementById("AzEl_state_2").innerHTML = data.AzEl_state[1];
    
    document.getElementById("AzEl_pOffs").innerHTML = "<strong> AzEl_pOffs </strong>";
    document.getElementById("AzEl_pOffs_1").innerHTML = data.AzEl_pOffs[0];
    document.getElementById("AzEl_pOffs_2").innerHTML = data.AzEl_pOffs[1];

    document.getElementById("AzEl_trOffs").innerHTML = "<strong> AzEl_trOffs </strong>";
    document.getElementById("AzEl_trOffs_1").innerHTML = data.AzEl_trOffs[0];
    document.getElementById("AzEl_trOffs_2").innerHTML = data.AzEl_trOffs[1];

    document.getElementById("trTable_index").innerHTML = "<strong> trTable_index </strong>";
    document.getElementById("trTable_index_1").innerHTML = data.trTable_index[0];
    document.getElementById("trTable_index_2").innerHTML = data.trTable_index[1];

    document.getElementById("offTable_index").innerHTML = "<strong> offTable_index </strong>";
    document.getElementById("offTable_index_1").innerHTML = data.offTable_index[0];
    document.getElementById("offTable_index_2").innerHTML = data.offTable_index[1];
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

