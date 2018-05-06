<?php

session_start();
session_write_close();

ignore_user_abort(true);

header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Access-Control-Allow-Origin: *");

//database
define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'oper');
define('DB_PASSWORD', 'parole');
define('DB_NAME', 'irbene');

//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

// start stream
while(true){

    if(connection_aborted()){
        exit();
    }

    else{
        $query = "SELECT * FROM rt32 LIMIT 1 ORDER BY Measurement_ID ASC";
    
        //execute query
        $result = $mysqli->query($query);
    
        //loop through the returned data
        $data = array();
        foreach ($result as $row) {
            $data[] = $row;
        }
    
        //free memory associated with result
        $result->close();
    
        //close connection
        $mysqli->close();
    
        //now print the data
        print json_encode($data);

    }
    sleep(1);
}
    
?>
