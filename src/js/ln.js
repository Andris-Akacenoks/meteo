
function displayLNstatus(data){
    displayLNLevelStatus(data);
    displaySystemTemperature(data);
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

function displaySystemTemperature(data){
    document.getElementById('ln-sys-temp-content').innerHTML = "";

    for(var i=0;i<data.systmp.length; i++){
        document.getElementById('ln-sys-temp-content').innerHTML += "<strong> Nr. "+(i+1)+"</strong>: "+ data.systmp[i]+"<br />";
    }


}




/*
    2. Systpm ir masīvs ar uztverošās sistēmas temperatūru kelvinos. 
            * Masīvā ir ap ~30 (laikam, varbūt ir mazāk) temp. vērtību, katra savam frekvenču kanālam jeb detektoram. 
            * Praksē tik daudzus neizmantojam, tipiski 4,  cietiem eksp. vairāk. 
            * Šo var vizualizēt grafiski jaunā tabā, attēlojot pēdejo aktuālo vērtību arī tekstā. 

Lai nebūtu par daudz, var uztaisīt, lai pēc default rāda tos kanālus, kuri tiek visbiežāk izmantot (resp. kuriem masīvā tagad nav 0 vērtība), 
pārējos retāk izmantotos kanālus - pēc lietotāja pieprasījuma.


{//RT16
    "systmp": [0.0, 24.48740005493164, 
        0.0, 0.0, 0.0, 0.0, 
        0.0, 0.0, 0.0, 25.02713966369629, 
        0.0, 0.0, 0.0, 0.0, 
        0.0, 0.0, 24.873186111450195, 
        0.0, 0.0, 0.0, 0.0, 
        0.0, 0.0, 0.0, 24.842100143432617, 
        0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 28.007978439331055, 
        0.0, 21.467815399169922, 
        0.0]
}

*/
