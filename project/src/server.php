<?php


$myServer = '127.0.0.1';
$myDB = 'irbene';
$myUser = 'root';
$myPass = '';
$d = mysqli_connect($myServer,$myUser,$myPass,$myDB) or die('Nevaru pievienoties datubāzei');
	$chs=mysqli_set_charset($d, "utf8");

	if($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["CONTENT_TYPE"] == "application/json")
	{
		$data = file_get_contents("php://input");
		$data_json = json_decode($data,true);

		$sql_vaicajums="
		INSERT INTO meteo(
			measurement_time, wind_speed,
			wind_gust,		  wind_speed_count,
			rain,			  wind_direction,
			input_voltage,	  solar_radiation,
			temperature,	  humidity,
			bar_pressure
			)
		VALUES(
			'{$data_json["measurementTime"]}',
			{$data_json["windSpeed"]},
			{$data_json["windGust"]},
			{$data_json["windSpeedCount"]},
			{$data_json["rain"]},
			{$data_json["windDirection"]},
			{$data_json["inputVoltage"]},
			NULL,
			{$data_json["temperature"]},
			{$data_json["humidity"]},
			{$data_json["barPressure"]}
		)";

		$result=mysqli_query($d,$sql_vaicajums);
		echo("Record added.");
	}


?>
