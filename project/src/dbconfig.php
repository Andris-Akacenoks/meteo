
<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	//database
	define('DB_HOST', '127.0.0.1');
	define('DB_USERNAME', 'oper');
	define('DB_PASSWORD', 'parole');
	define('DB_NAME', 'irbene');

	//get connection
	$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
	$step = 1;

	if(!$mysqli){
		die("Connection failed: " . $mysqli->error);
	}

	if(isset($_GET['interval'])){

		if(($_GET['interval'] === 'lasthour') || ($_GET['interval'] === 'undefined') ){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime("-16 days -1 hour"));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime("-16 days +1 hour"));
		}
		elseif($_GET['interval'] === 'last12h'){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-16 days -12 hour'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-16 days +1 hour'));
		}
		elseif($_GET['interval'] === 'yesterday'){
			$step = 2;
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-16 days -1 day'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-16 days +1 hour'));
		}
		elseif($_GET['interval'] === 'lastweek'){
			$step = 12;
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-16 days -7 day'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-16 days +1 hour'));
		}
		else{
			$interval = $_GET['interval'];

			$startDate = substr($interval, 0, 16);
			$endDate = substr($interval, 17, 32);

			$startDate = $startDate . ":25";
			$endDate = $endDate . ":25";

			$yesterdayDateSQL = date ("Y-m-d H:i:s", strtotime($startDate));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime($endDate));
		}
	}
	else{
		$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-16 days -1 hour')); // default pedeja stunda
		$todayDateSQL = date('Y-m-d H:i:s', strtotime('-16 days +1 hour'));
	}

	$query = "SELECT * FROM
	( SELECT @row := @row +1
	AS rownum, meteo.*
		FROM ( SELECT @row :=0) r, meteo) ranked
		WHERE (rownum %{$step} =0) and(measurement_time >= '{$yesterdayDateSQL}' AND measurement_time <= '{$todayDateSQL}') ORDER BY measurement_time ASC";

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
