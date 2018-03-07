<!DOCTYPE html>
<?php
	//include 'dbconfig.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"/></script>
    <script src="../lib/plugins/jquery/jquery.min.js"></script>
    <script src="js/moment.js"></script>
		<script src="js/charts.js"></script>


    <script>
        function SubmitFormData() {
            var myfield = $("#myfield").val();
            var yesterday = $("#yesterday").val();
            var now = $("#now").val();
            $.post("index.php", { myfield: myfield, yesterday: yesterday, now: now})
        }

    </script>

        <link rel="shortcut icon" type="image/png" href="css\images\favicon.ico"/>

<title>Home</title>
    <link href="../lib/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/colors/blue.css" id="theme" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body class="fix-header fix-sidebar card-no-border">
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <div id="main-wrapper">
        <header class="topbar">
            <nav class="navbar top-navbar navbar-toggleable-sm navbar-light">
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.html">
                </div>
                <div class="navbar-collapse">
                    <ul class="navbar-nav mr-auto mt-md-0">
                        <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                            
                        </li>
                    </ul>
                    <ul class="navbar-nav my-lg-0">
                        <li class="nav-item dropdown">
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <aside class="left-sidebar">
            <div class="scroll-sidebar">
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li> <a class="waves-effect waves-dark" href="index.php" aria-expanded="false"><i class="mdi mdi-gauge"></i><span class="hide-menu">Home    </span></a>
                        </li>
                        <li> <a class="waves-effect waves-dark" href="combined.php" aria-expanded="false"><i class="mdi mdi-gauge"></i><span class="hide-menu">Meteo station data</span></a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="sidebar-footer">
                <!-- item--><a href="" class="link" data-toggle="tooltip" title="Settings"><i class="ti-settings"></i></a>
                <!-- item--><a href="" class="link" data-toggle="tooltip" title="Email"><i class="mdi mdi-gmail"></i></a>
                <!-- item--><a href="" class="link" data-toggle="tooltip" title="Logout"><i class="mdi mdi-power"></i></a> </div>
        </aside>
        <div class="page-wrapper">
            <div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-5 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Seperated data</h3>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                            <li class="breadcrumb-item active">Seperated data</li>
                        </ol>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-block">
                                <form action="index.php" method="POST">
                                    <input type="datetime-local" name="yesterday" id="yesterday"/>
                                    <input type="datetime-local" name="now" id="now"/>
                                    <br/><br/>
									<select name='myfield' id="myfield" onchange='this.form.submit()'>
										<option value="...">...</option>
										<option value="wind_speed">Vēja ātrums</option>
										<option value="wind_gust">Vēja brāzmas</option>
										<option value="wind_speed_count">Vēja ātruma skaits</option>
										<option value="rain">Nokrišņi</option>
										<option value="wind_direction">Vēja virziens</option>
										<option value="input_voltage">Ieejas spriegums</option>
										<option value="solar_radiation">Saules radiācija</option>
										<option value="temperature">Temperatūra</option>
										<option value="humidity">Gaisa mitrums</option>
										<option value="bar_pressure">Atmosfēras spiediens</option>

									</select>
								</form>
                                <?php
                                $time = array();
                                $windSpeed = array();
                                if($_SERVER['REQUEST_METHOD'] === 'POST'){
                                    if(isset($_POST ['yesterday']) && isset($_POST ['now'])){
                                        $selectOption = $_POST['myfield'];
                                        $yesterdayDate = $_POST ['yesterday'];
                                        $todayDate = $_POST ['now'];

                                        $yesterdayDateSQL = date ("Y-m-d H:i:s", strtotime($yesterdayDate));
                                        $todayDateSQL = date ("Y-m-d H:i:s", strtotime($todayDate));

                                        $querryWindSpeed = "SELECT measurement_time, {$selectOption}
                                                            FROM meteo
                                                                WHERE measurement_time >= '{$yesterdayDateSQL}' AND measurement_time <= '{$todayDateSQL}'
                                                            ORDER BY measurement_time DESC";
                                        $resultTime = mysqli_query($d,$querryWindSpeed);

                                        while( $row = mysqli_fetch_assoc( $resultTime)){
                                            $time[] = substr($row['measurement_time'],11,8);


                                            $windSpeed[] = $row[$selectOption];
                                        }
                                    }
                                }
                                ?>
                                <div style="width:1000px">
                                    <canvas id="lineChart"></canvas>
                                <div>

							    <script>
                                    var time = [].concat(<?php echo json_encode($time);?>).reverse();
                                    var metric = [].concat(<?php echo json_encode($windSpeed);?>).reverse();

                                    createLineChart("line" ,"lineChart", time, metric,"<?php echo($_POST['myfield']); ?>",  "#3e95cd", "Laiks", "<?php echo($selectOption); ?>");
                                </script>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="../lib/plugins/bootstrap/js/tether.min.js"></script>
    <script src="../lib/plugins/bootstrap/js/bootstrap.min.js"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="js/jquery.slimscroll.js"></script>
    <!--Wave Effects -->
    <script src="js/waves.js"></script>
    <!--Menu sidebar -->
    <script src="js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="../lib/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <!--Custom JavaScript -->
    <script src="js/custom.min.js"></script>

</body>

</html>
