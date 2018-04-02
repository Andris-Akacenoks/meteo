<?php


$myServer = '127.0.0.1';
$myDB = 'irbene';
$myUser = 'oper';
$myPass = 'parole';
$d = mysqli_connect($myServer,$myUser,$myPass,$myDB) or die('Could not connect to database');
	$chs=mysqli_set_charset($d, "utf8");

	if($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["CONTENT_TYPE"] == "application/json")
	{
		$data = file_get_contents("php://input");
		$data_json = json_decode($data,true);

		$sql_vaicajums="
		INSERT INTO meteo(
			measurement_time, wind_speed,
			wind_gust, wind_speed_count,
			rain, wind_direction,
			input_voltage,
			temperature, humidity,
			bar_pressure, solar_radiation
			)
		VALUES(
			'{$data_json["measurementTime"]}',
			{$data_json["windSpeed"]},
			{$data_json["windGust"]},
			{$data_json["windSpeedCount"]},
			{$data_json["rain"]},
			{$data_json["windDirection"]},
			{$data_json["inputVoltage"]},
			{$data_json["temperature"]},
			{$data_json["humidity"]},
			{$data_json["barPressure"]},
			{$data_json["solarRadiation"]}

		)";
		
		$result=mysqli_query($d,$sql_vaicajums) or die(mysqli_error($d));
		var_dump($result);
		echo("Record added.");
	
}
//mysql_close($d);

?>
