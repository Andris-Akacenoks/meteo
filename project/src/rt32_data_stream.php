<?php

session_start();
session_write_close();

ignore_user_abort(true);

header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Access-Control-Allow-Origin: *");

// start stream
while(true){

    if(connection_aborted()){
        exit();
    }

    else{
        $fh = fopen('../rt32.json','r');
        while ($line = fgets($fh)) {
          echo "data: {$line}\n\n";
          ob_flush();
          flush();
        }
        fclose($fh);
    }
    sleep(1);
}
    
?>