<?php

//include("dbconfig.php");

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Andris Akacenoks">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
        <script src="../lib/plugins/jquery/jquery.min.js"></script>
        <script src="js/moment.js"></script>
        <link href="../lib/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        <link href="css/colors/blue.css" id="theme" rel="stylesheet">
        <title>Sākums</title>
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
                            <div id="show">
                            </div>
                                <div class="card-block"  id="card-block">
                                    <form id="myform"  method="POST"  class="form_statusinput">
                                        <input type="datetime-local" name="yesterday" id="yesterday"/>
                                        <input type="datetime-local" name="now" id="now"/>
                                        <input type="submit" class="submit-button" id="button" value="Parādīt">
                                        <!-- <input type="submit" name="lastHour" id="button_1" value="Pēdējā stunda" class="range-button">
                                        <input type="submit" name="last12hours" value="Pēdējās 12 stundas" class="range-button">
                                        <input type="submit" name="lastDay" value="Pēdējā diennakts" class="range-button">
                                        <input type="submit" name="lastWeek" value="Pēdējā nedēļa" class="range-button"> -->
                                        <button type="button" onclick="changeInterval('lasthour')" class="range-button">Pēdējā stunda</button>
                                        <button type="button" onclick="changeInterval('last12h')" class="range-button">Pēdējās 12 stundas</button>
                                        <button type="button" onclick="changeInterval('yesterday')" class="range-button">Pēdējā diennakts</button>
                                        <button type="button" onclick="changeInterval('lastweek')" class="range-button">Pēdējā nedēļa</button>
                                    </form>

                                    <br />
                                    <br />

                                <?php


                                ?>
                                    <div id="chartsParent">
                                        <div id="left" class="line-chart-container" style="width: 50%; float:left; overflow:hidden;">
                                            <div id="object1" style="width:100%">
                                                <canvas id="chart1"></canvas><br/>
                                            </div>
                                            <div id="object3" style="width:100%">
                                                <canvas id="chart3"></canvas><br/>
                                            </div>
                                            <div id="object5" style="width:100%">
                                                <canvas id="chart5"></canvas><br/>
                                            </div>
                                        </div>

                                        <div id="right" class="line-chart-container" style="width: 50%; float:right; overflow:hidden;">

                                            <div id="object2" style="width:100%" >
                                                <canvas id="chart2"></canvas><br/>
                                            </div>
                                            <div id="object4" style="width:100%">
                                                <canvas id="chart4"></canvas><br/>
                                            </div>


                                        </div>
                                        <!-- <div id="current-values-box">
                                            <h3>Aktuālie dati</h3>
                                            <p>Pēdēja mērījuma laiks -
                                                <script type="text/javascript">
                                                    document.write(time[time.length - 1]);
                                                </script>
                                            </p>
                                            <p>Nokrišņi -
                                                <script type="text/javascript">
                                                    document.write(rainValues[rainValues.length - 1]);
                                                </script>
                                            </p>
                                            <p>Ieejas strāva -
                                                <script type="text/javascript">
                                                    document.write(inputVoltageValues[inputVoltageValues.length - 1]);
                                                </script>
                                            </p>
                                            <p>Temperatūra -
                                                <script type="text/javascript">
                                                    document.write(temperatureValues[temperatureValues.length - 1]);
                                                </script>
                                            </p>
                                            <p>Gaisa mitrums -
                                                <script type="text/javascript">
                                                    document.write(humidityValues[humidityValues.length - 1]);
                                                </script>
                                            </p>
                                            <p>Atmosfēras -
                                                <script type="text/javascript">
                                                    document.write(pressureValues[pressureValues.length - 1]);
                                                </script>
                                            </p>

                                        </div> -->
                                    </div>

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
        <script>
        $(document).ready(function(){
            $("form#myform").submit(function(event) {
                event.preventDefault();
                var yesterday = $("#yesterday").val();
                var now = $("#now").val();
                var currentInterval = yesterday+"+"+now;
                alert(currentInterval);
                changeInterval(currentInterval);

                // $.ajax({
                //     type: "POST",
                //     url: "http://localhost/project/src/dbconfig.php",
                //     //data: {yesterday: yesterday, now: now},
                //     data: JSON.stringify({yesterday: yesterday, now: now}),
                //     contentType: "application/json",
                //     dataType: "json",
                //     success: function(data){
                //         console.log("POST success.");
                //         console.log(data);
                //         updateCharts(currentInterval);
                //     },
                //     error: function (data) {
                //         console.log("POST failed.");
                //         console.log(data);
                //     }
                // });
            });
        });
        </script>
        <script src="js/charts.js"></script>
    </body>
</html>
