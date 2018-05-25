var showNonZerolTemperaturesPressed = true;


function displayLNstatus(data){
    displayLNLevelStatus(data);
    displaySystemTemperature(showNonZerolTemperaturesPressed, data);
}

function displayLNLevelStatus(data){
    var levels = [
        'Vd11','Id11','Vg11','Vd12',
        'Id12', 'Vg12', 'Vd13','Id13',
        'Vg13', 'Vd21', 'Id21', 'Vg21',
        'Vd22', 'Id22', 'Vg22', 'Vd23',
        'Id23', 'Vg23'
    ];

    var metrics = [
        'V', 'mA', 'V', 'V',
        'mA', 'V', 'V', 'V',
        'V', 'V', 'mA', 'V',
        'V', 'mA', 'V', 'V',
        'mA', 'V'
    ]

    for(var i=0;i<levels.length; i++){
        document.getElementById(levels[i]+'-label').innerHTML = levels[i];
        document.getElementById(levels[i]+'-value').innerHTML =data.rxc_ln[i]+" "+metrics[i];
    }
}

function displaySystemTemperature(onlyNonZeroValues, data){
    document.getElementById('ln-sys-temp-content').innerHTML = "";

    for(var i=0;i<data.systmp.length; i++){
        if(onlyNonZeroValues){
            if(data.systmp[i] != 0){
                document.getElementById('ln-sys-temp-content').innerHTML += "<strong> Detector #"+(i+1)+"</strong>: "+ data.systmp[i].toFixed(6)+" K <br />";
            }  
        }
        else{
            if(data.systmp[i] != 0){
                document.getElementById('ln-sys-temp-content').innerHTML += "<strong> Detector #"+(i+1)+"</strong>: "+ data.systmp[i].toFixed(6)+" K <br />";
            }
            else{
                document.getElementById('ln-sys-temp-content').innerHTML += "<strong> Detector #"+(i+1)+"</strong>: "+ data.systmp[i]+"   K <br />";
            }
        }
    }

}

jQuery(document).ready(function(){
    $('#toggle-temp-btn').click(function(){
        if(showNonZerolTemperaturesPressed){
            document.getElementById("toggle-temp-btn").innerHTML = 'Show non-zero temperatures';
            showNonZerolTemperaturesPressed = false;
        }
        else{
            document.getElementById("toggle-temp-btn").innerHTML = 'Show all temperatures';
            showNonZerolTemperaturesPressed = true;
        }
    });

});
