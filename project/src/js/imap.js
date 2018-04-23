
function getLatestStatus(){
    $.ajax({
        url: "http://35.195.69.44/project/src/imap.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            document.getElementById('popup').innerHTML =utcDate+"<strong> Latest status message: </strong> "+data+" <br />";
        },
        error: function (data) {
            console.log("ERROR");
        }
    });
}