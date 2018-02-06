<?php


    $querry = "SELECT measurement_time
    FROM meteo
        WHERE measurement_time >= '2018-02-06 16:45:00'
    ORDER BY measurement_time DESC LIMIT 5";
    $result = mysqli_query($d,$querry);

    while( $row = mysqli_fetch_assoc( $result)){
        echo( substr($row['measurement_time'],0,16)."<br/>"); // nonemtas nost sekundes ar substr
    }
    //print_r($time);


?>