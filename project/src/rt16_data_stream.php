<?php
    session_start();
    session_write_close();

    ignore_user_abort(true);

    header("Content-Type: text/event-stream");
    header("Cache-Control: no-cache");
    header("Access-Control-Allow-Origin: *");
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    header('Access-Control-Allow-Origin: *');

    $config = parse_ini_file('../../clients/config.ini'); 
    $mysqli = mysqli_connect('127.0.0.1',$config['username'],$config['password'],$config['dbname']);

    if(!$mysqli){
        die("Connection failed: " . $mysqli->error);
    }
    $query = "SELECT * from rt16 ORDER BY Measurement_ID DESC LIMIT 1;";

    while(true){
        if(connection_aborted()){
            exit();
        }
        else{

            if ($result = $mysqli->query($query)) {
                $result = $mysqli->query($query);
                $data = array();
                foreach ($result as $row) {
                    $data[] = $row["Data"];
                }
                echo "data: " . json_encode($data) . "\n\n";
                ob_flush();
                flush();
            }
        }
        sleep(1);
    }
?>
