function displayLNstatus(data){
    var levels = [
        'Vd11','Id11','Vg11','Vd21',
        'Id12', 'Vg12', 'Vd13','Id13',
        'Vg13', 'Vd21', 'Id21', 'Vg21',
        'Vd22', 'Id22', 'Vg22', 'Vd23',
        'Id23', 'Vg23'
    ];

    for(var i=0;i<levels.length; i++){
        document.getElementById(levels[i]+'-label').innerHTML = levels[i];
        document.getElementById(levels[i]+'-value').innerHTML =data.rxc_ln[i]+"mA";
    }

}
/*
Vd11    =1.52V,
Id11    =0.2mA,
Vg11    =12.63V, 
Vd12    =1.23V, 
Id12    =0mA, 
Vg12    =12.75V,
Vd13    =1.25V, 
Id13    =0V, 
Vg13    =12.63V,
Vd21    =1.25V, 
Id21    =0.2mA,
Vg21    =12.56V, 
Vd22    =0V, 
Id22    =0mA,
Vg22    =14.99V;
Vd23    =0V, 
Id23    =0mA,
Vg23    =14.90V



    "rxc_ln": ["+00.90", "+05.85", "-01.38", "+00.65", "+03.96", 
                "-01.53", "+00.54", "+03.96", "-01.61", "+01.00", 
                "+04.89", "-02.11", "+00.45", "+04.01", "+00.99", 
                "+00.54", "+03.96", "-000.16"], 


*/