var data = {
    "AzEl_pos": [194.99960616230925, 90.02203400433041],  // done
    "AzEl_vel": [-9.273242259513042e-20, 4.464285714287477e-07],  // done
    "El_stowed": 1, //done
    "El_stowPin1": 1, 
    "El_stowPin2": 1, 
    "El_stow_posOk": 1, 
    "trTable_index": [1, 0], 
    "El_stow_preDn": 0, 
    "AzEl_state": [0, 0], 
    "AzEl_pOffs": [0.0, 0.0],  //done
    "offTable_index": [1, 0], //done
    "El_stow_preUp": 0, 
    "AzEl_trOffs": [0.0, 0.0], // done
    "AzEl_des": [194.99960616230925, 90.02203400433041] // done
 }

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
}

function setStow(div, data){
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

