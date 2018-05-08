
function getLatestStatus(){
    $.ajax({
        url: "http://35.195.233.207/src/datasources/imap.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            document.getElementById('popup').innerHTML =utcDate+"<strong> Latest status message: </strong> "+data+" <br />";
        },
        error: function (data) {
            console.log("An error occured while retreiving status.");
        }
    });
}