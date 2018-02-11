
<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	header('Content-Type: application/json');

	//database
	define('DB_HOST', '127.0.0.1');
	define('DB_USERNAME', 'root');
	define('DB_PASSWORD', '');
	define('DB_NAME', 'irbene');

	//get connection
	$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

	if(!$mysqli){
		die("Connection failed: " . $mysqli->error);
	}

	if(isset($_GET['interval'])){

		if($_GET['interval'] === 'lasthour'){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-2 hour'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-1 hour'));
		}
		elseif($_GET['interval'] === 'last12h'){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-13 hour'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-1 hour'));
		}
		elseif($_GET['interval'] === 'yesterday'){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-1 day'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-1 hour'));
		}
		elseif($_GET['interval'] === 'lastweek'){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-7 day'));
			$todayDateSQL = date('Y-m-d H:i:s', strtotime('-1 hour'));
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
		$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-2 hour')); // default pedeja stunda
		$todayDateSQL = date('Y-m-d H:i:s', strtotime('-1 hour'));
	}

	

	
// if($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["CONTENT_TYPE"] == "application/json") // shis stradaa
// {
// 	$data = file_get_contents("php://input");
// 	$data_json = json_decode($data,true);
// 	// POST data
// 	$yesterdayDate = $data_json["yesterday"];
// 	$todayDate = $data_json["now"];

//     $yesterdayDateSQL = date ("Y-m-d H:i:s", strtotime($yesterdayDate));
// 	$todayDateSQL = date ("Y-m-d H:i:s", strtotime($todayDate));
// }
// else{
// 	$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime('-2 hour'));
// 	$todayDateSQL = date('Y-m-d H:i:s', strtotime('-1 hour'));

// }


	$query = sprintf("SELECT *
		FROM meteo
		WHERE measurement_time >= '{$yesterdayDateSQL}' AND measurement_time <= '{$todayDateSQL}'
		ORDER BY measurement_time ASC");

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
