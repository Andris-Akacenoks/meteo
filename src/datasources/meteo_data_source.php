
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

		if(($_GET['interval'] === 'lasthour') || ($_GET['interval'] === 'undefined') ){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime("-4 hour"));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime("-3 hour"));
		}
		elseif($_GET['interval'] === 'last12h'){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-16 hour'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-3 hour'));
		}
		elseif($_GET['interval'] === 'yesterday'){
			$step = 2;
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-1 day -4 hour'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-3 hour'));
		}
		elseif($_GET['interval'] === 'lastweek'){
			$step = 12;
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-7 day -4 hour '));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-3 hour'));
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
		$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-4 hour')); // default pedeja stunda
		$todayDateSQL = date('Y-m-d H:i:s', strtotime('-3 hour'));
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
