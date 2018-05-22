
<?php
	error_reporting(E_ALL);
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
    print json_encode("Before config");

	$config = parse_ini_file('../../../clients/config.ini'); 
    $mysqli = mysqli_connect('127.0.0.1',$config['username'],$config['password'],$config['dbname']);
    print json_encode("after config");

	if(!$mysqli){
		die("Connection failed: " . $mysqli->error);
	}


	if(isset($_GET['interval'])){
		if(($_GET['interval'] === '24h') || ($_GET['interval'] === 'undefined') ){
			$yesterdayDateSQL = date('Y-m-d H:i:s', strtotime("-7 day"));
            $todayDateSQL = date('Y-m-d H:i:s', strtotime("-3 hour"));
            print json_encode($yesterdayDateSQL);
            print json_encode($todayDateSQL);

        }
    }

    print json_encode("before query");

	$query = "SELECT Data FROM rt16";

	// //execute query
	$result = $mysqli->query($query);
    print json_encode("after query");


	// //loop through the returned data
	$data = array();
	foreach ($result as $row) {
		$data[] = $row;
	}
    print json_encode("after loop");

	// //free memory associated with result
	$result->close();

	// //close connection
	$mysqli->close();
    print json_encode("after close");

	//now print the data
    print json_encode($data);
    print json_encode("test");

?>