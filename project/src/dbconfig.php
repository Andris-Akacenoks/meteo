
<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	$myServer = '127.0.0.1';
	$myDB = 'irbene';
	$myUser = 'root';
	$myPass = '';

	$d = mysqli_connect($myServer,$myUser,$myPass,$myDB) or die('Nevaru pievienoties datubāzei');
    $chs=mysqli_set_charset($d, "utf8");
            
?>