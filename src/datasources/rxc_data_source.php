
<?php
	error_reporting(E_ALL);
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	$config = parse_ini_file('../../../clients/config.ini'); 
    $mysqli = mysqli_connect('127.0.0.1',$config['username'],$config['password'],$config['dbname']);
	
	if(!$mysqli){
		die("Connection failed: " . $mysqli->error);
	}

	$step = 1;

	if(isset($_GET['interval'])){
		if(($_GET['interval'] === '24h') || ($_GET['interval'] === 'undefined') ){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime("-7 day 4 hour"));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime("-3 hour"));
        }
    }


	$query = "SELECT Data FROM rt16 WHERE (measurement_time >= '{$yesterdayDateSQL}' AND measurement_time <= '{$todayDateSQL}')";

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

?>
