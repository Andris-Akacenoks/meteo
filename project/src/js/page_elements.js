
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