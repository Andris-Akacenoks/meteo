

function showToast(message) {
    var x = document.getElementById("snackbar")
    x.className = "show";
    document.getElementById('snackbar').innerHTML = message;
    //document.getElementById("audio").play();
    
    setTimeout(function(){
        x.className = x.className.replace("show", ""); 
    }, 1000 * 10); // 10 seconds
}

function getTimestamp(){
    var time = new Date();
    return  ("0" + time.getHours()).slice(-2)   + ":" + 
            ("0" + time.getMinutes()).slice(-2) + ":" + 
            ("0" + time.getSeconds()).slice(-2);
}

function printLog(message){
    console.log(getTimestamp() + ": " + message);
}

function showPopup() {
    $("#mask").fadeTo(300, 0.7);
    $("#popup").show();
    var errorcontent = document.getElementById('acu-error');
    document.getElementById('popup').innerHTML = errorcontent.innerHTML;
    $("#error-area").hide();
    $("#show-status").hide();

}

function showPopupWithStatus() {
    document.getElementById("acu-error").innerHTML = "";
    $("#mask").fadeTo(300, 0.7);
    $("#popup").show();
    getLatestStatus();
    $("#error-area").hide();
}

function closeErrorPopup(){
    $("#mask").hide();
    $("#popup").hide();
    $("#error-area").show();
    $("#show-status").show();
}


jQuery(document).ready(function(){
    jQuery('#hideshow').on('click', function(event) {        
         jQuery('#alarm-contents').toggle('show');
    });

});

