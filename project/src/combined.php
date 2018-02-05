<!DOCTYPE html>
<?php
	include 'dbconfig.php';
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
        <script src="javascript.js"></script>
        <script src="js/moment.js"></script>

        <script>
            function SubmitFormData() {
                var myfield = $("#myfield").val();
                var yesterday = $("#yesterday").val();
                var now = $("#now").val();
                $.post("combined.php", { myfield: myfield, yesterday: yesterday, now: now})
            }
        </script>

    <title>Sākums</title>
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
                        <li class="nav-item hidden-sm-down search-box"> <a class="nav-link hidden-sm-down text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="ti-search"></i></a>
                            <form class="app-search">
                                <input type="text" class="form-control" placeholder="Search & enter"> <a class="srh-btn"><i class="ti-close"></i></a> </form>
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
                        <li> <a class="waves-effect waves-dark" href="index.php" aria-expanded="false"><i class="mdi mdi-gauge"></i><span class="hide-menu">Meteo stacijas dati</span></a>
                        </li>
                        <li> <a class="waves-effect waves-dark" href="combined.php" aria-expanded="false"><i class="mdi mdi-gauge"></i><span class="hide-menu">Apvienotie dati</span></a>
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
                        <h3 class="text-themecolor m-b-0 m-t-0">Dashboard</h3>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                        <div id="test"></div>
                            <div class="card-block"  id="card-block">
								<form action="combined.php" method="POST">
                                    <input type="datetime-local" name="yesterday" id="yesterday"/>
                                    <input type="datetime-local" name="now" id="now"/>
                                    <input type="submit" value="Submit">
                                    <input type="submit" name="lastHour" value="Pēdējā stunda">
                                    <input type="submit" name="last12hours" value="Pēdējās 12 stundas">
                                    <input type="submit" name="lastDay" value="Pēdējā diennakts">
                                    <input type="submit" name="lastWeek" value="Pēdējā nedēļa">
                                    <br/><br/>
								</form>
                              <?php
                                $time = array();
                                $rain = array();
                                $inputVoltage = array();
                                $temperature = array();
                                $humidity = array();
                                $bar_pressure = array();
                                if($_SERVER['REQUEST_METHOD'] === 'POST'){
                                    $yesterdayDate = "";
                                    $todayDate = "";
                                    $date = date('Y-m-d H:i:s');
                                    $todayDate = date('Y-m-d H:i:s', strtotime($date . ' -2 hour'));
                                    
                                    if (isset($_POST['lastHour'])) {                                        
                                        $yesterdayDate = date('Y-m-d H:i:s', strtotime($todayDate . ' -1 hour'));
                                    }
                                    elseif(isset($_POST['last12hours'])){
                                        $yesterdayDate = date('Y-m-d H:i:s', strtotime($todayDate . ' -12 hour'));
                                    }
                                    elseif(isset($_POST['lastDay'])){
                                        $yesterdayDate = date('Y-m-d H:i:s', strtotime($todayDate . ' -1 day'));
                                    }
                                    elseif(isset($_POST['lastWeek'])){
                                        $yesterdayDate = date('Y-m-d H:i:s', strtotime($todayDate . ' -7 day'));
                                    }
                                    elseif(isset($_POST ['yesterday']) && isset($_POST ['now'])){
                                        $yesterdayDate = $_POST ['yesterday'];
                                        $todayDate = $_POST ['now'];
                                    }

                                    $yesterdayDateSQL = date ("Y-m-d H:i:s", strtotime($yesterdayDate));
                                    $todayDateSQL = date ("Y-m-d H:i:s", strtotime($todayDate));

                                    $querry = "SELECT measurement_time, rain, input_voltage, temperature, humidity, bar_pressure
                                                        FROM meteo
                                                            WHERE measurement_time >= '{$yesterdayDateSQL}' AND measurement_time <= '{$todayDateSQL}'
                                                        ORDER BY measurement_time DESC";
                                    $result = mysqli_query($d,$querry);

                                    while( $row = mysqli_fetch_assoc( $result)){
                                        $time[] = substr($row['measurement_time'],0,16); // nonemtas nost sekundes ar substr
                                        $rain[] = $row['rain'];
                                        $inputVoltage[] = $row['input_voltage'];
                                        $temperature[] = $row['temperature'];
                                        $humidity[] = $row['humidity'];
                                        $bar_pressure[] = $row["bar_pressure"];
                                    }
                                }
                               ?>
                                <div id="chartsParent">
                                    <div id="left" style="width: 50%; float:left; overflow:hidden;">
                                        <div id="object1" style="width:700px">
                                            <canvas id="chart1"></canvas>
                                        </div>
                                        <div id="object3" style="width:700px">
                                            <canvas id="chart3"></canvas>
                                        </div>
                                        <div id="object5" style="width:700px">
                                            <canvas id="chart5"></canvas>
                                        </div>
                                    </div>

                                    <div id="right" style="width: 50%; float:right; overflow:hidden;">

                                        <div id="object2" style="width:700px" >
                                            <canvas id="chart2"></canvas>
                                        </div>
                                        <div id="object4" style="width:700px">
                                            <canvas id="chart4"></canvas>
                                        </div>
                                    </div>
                                </div>
									<script>
                                        var time = [].concat(<?php echo json_encode($time);?>).reverse();
                                        var rainValues = [].concat(<?php echo json_encode($rain);?>).reverse();
                                        var inputVoltageValues = [].concat( <?php echo json_encode($inputVoltage);?>).reverse();
                                        var temperatureValues = [].concat(<?php echo json_encode($temperature);?>).reverse();
                                        var humidityValues = [].concat(<?php echo json_encode($humidity);?>).reverse();
                                        var pressureValues = [].concat(<?php echo json_encode($bar_pressure);?>).reverse();

                                        createLineChart("line","chart1", time, rainValues, "Nokrišņi", "#0000FF", "Laiks", "rain" );
                                        createLineChart("line","chart2", time, inputVoltageValues, "Ieejas strāva", "#CC0000", "Laiks", "input_voltage");
                                        createLineChart("line","chart3", time, temperatureValues, "Temperatūra", "#008000", "Laiks", "temperature");
                                        createLineChart("line","chart4", time, humidityValues, "Gaisa mitrums", "#8e5ea2", "Laiks", "humidity");
                                        createLineChart("line","chart5", time, pressureValues, "Atmosfēras spiediens", "#8e5ea2", "Laiks", "bar_pressure");
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
    <!--Menu sidebar -->
    <script src="js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="../lib/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <!--Custom JavaScript -->
    <script src="js/custom.min.js"></script>

</body>

</html>
