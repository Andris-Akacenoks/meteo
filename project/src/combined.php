<?php

//include("dbconfig.php");

?>
<?php header('Access-Control-Allow-Origin: *'); ?>

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
                            <li> <a class="waves-effect waves-dark" href="index.php" aria-expanded="false"><i class="mdi mdi-gauge"></i><span class="hide-menu">Home</span></a>
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
                            <h3 class="text-themecolor m-b-0 m-t-0">Meteo station data</h3>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                                <li class="breadcrumb-item active">Meteo station data</li>
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
                                        <input type="submit" class="submit-button" id="button" value="Show">
                                        <button type="button" onclick="changeInterval('lasthour', true)" class="range-button">Last hour</button>
                                        <button type="button" onclick="changeInterval('last12h', true)" class="range-button">Last 12 hours</button>
                                        <button type="button" onclick="changeInterval('yesterday', true)" class="range-button">Last 24 hours</button>
                                        <button type="button" onclick="changeInterval('lastweek', true)" class="range-button">Last week</button>
                                    </form><br /><br />
                                    <div>
                                        <h3>Current data</h3>

                                        <p id="lastRain"style="float:right; padding-right: 1%;"></p>
                                        <p id="lastVoltage"style="float:right; padding-right: 1%;"></p>
                                        <p id="lastTemperature" style="float:right; padding-right: 1%;"></p>
                                        <p id="lastHumidity"style="float:right; padding-right: 1%;"></p>
                                        <p id="lastPressure"style="float:right; padding-right: 1%;"></p>
                                        <p id="lastTime"style="float:right; padding-right: 1%;"></p>
                                    </div>
                                <?php
                                    // nothing to see here
                                ?>
                                    <div id="chartsParent">
                                        
                                        <div id="left" class="left-line-chart-container">
                                            <div id="object1" class="chart-canvas">
                                                <canvas id="chart1"></canvas><br/>
                                            </div>
                                            <div id="object3" class="chart-canvas">
                                                <canvas id="chart3"></canvas><br/>
                                            </div>
                                            <div id="object5" class="chart-canvas">
                                                <canvas id="chart5"></canvas><br/>
                                            </div>
                                            <div id="object7" class="chart-canvas">
                                                <canvas id="chart7"></canvas><br/>
                                            </div>
                                            <div id="object9" class="chart-canvas">
                                                <canvas id="chart9"></canvas><br/>
                                            </div>
                                        </div>

                                        <div id="right" class="right-line-chart-container">

                                            <div id="object2" class="chart-canvas">
                                                <canvas id="chart2"></canvas><br/>
                                            </div>
                                            <div id="object4" class="chart-canvas">
                                                <canvas id="chart4"></canvas><br/>
                                            <div id="object6" class="chart-canvas">
                                                <canvas id="chart6"></canvas><br/>
                                            </div>
                                            <div id="object8" class="chart-canvas">
                                                <canvas id="chart8"></canvas><br/>
                                            </div>
                                        </div>


                                        </div>

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
                changeInterval(currentInterval, false); // refresh not allowed

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
