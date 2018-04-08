
function showToast(message) {
    var x = document.getElementById("snackbar")
    x.className = "show";
    document.getElementById('snackbar').innerHTML = message;
    //document.getElementById("audio").play();
    
    setTimeout(function(){
        x.className = x.className.replace("show", ""); 
    }, 1000 * 10); // 10 seconds
  }