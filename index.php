<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Andris Akacenoks">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
        <script src="src/js/external_lib/moment.js"></script>
        <link href="src/js/external_lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js"></script>
        <!-- <audio id="audio" src="css/sounds/toast.mp3" autostart="false" ></audio> -->
        <link href="src/css/style.css" rel="stylesheet">
        <link href="src/css/toast.css" rel="stylesheet">
        <link href="src/css/toggle.css" rel="stylesheet">
        <link href="src/css/acu_loading_spinner.css" rel="stylesheet">
        <script src="src/js/base64.js" charset="utf-8"></script>
        <script src="src/js/page_elements.js" charset="utf-8"></script>
        <script src="src/js/scatter.js" charset="utf-8"></script>
        <script src="src/js/imap.js" charset="utf-8"></script>


        <link rel="shortcut icon" type="image/png" href="css\images\favicon.ico"/>
        <title>Irbene</title>
    </head>
    <body class="fix-header fix-sidebar card-no-border">
        <div id="main-wrapper">
            <header class="topbar">
                <ul>
                    <li class="nav-item">
                        <a class="nav-link scroll" href="#meteo-data">Meteo scatter</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link scroll" href="#page-wrappe">Meteo station data</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link scroll" href="#rxc-data">RXC data</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link scroll" href="#acu-data">ACU data</a>
                    </li>
                </ul>
            </header>
            <section class="acu-data" id="acu-data" style="overflow-y:auto;height:100vh;">
                <br><br><br>
                <h3 id="acu-heading">ACU data</h3>

                <button class="telescope-button" id="rt16button">RT16</button>
                <button class="telescope-button" id="rt32button" style="opacity:0.5;">RT32</button>
                <div style="position: absolute; left: 50%;">
                    <div id='popup'></div>
                </div>

                <div id="indicator-container" class="container">
                    <div id="acu-params">
                        <div id="acu-indicator-container-1">
                            <div class="indicator" id="Az-state-indicator"><a class="indicator-title">Azimuth axis state</a><p id="Az-state-status"></p> </div>
                            <div class="indicator" id="El_stowed-indicator"><a class="indicator-title">Stow pos #1 reached</a><p id="El-stowed-status"></p></div>
                            <div class="indicator" id="El_stowPin1-indicator"><a class="indicator-title">El axis Pin1 status</a><p id="El-stowPin1-status"></p></div>
                            <div class="indicator" id="El_stow_preDn-indicator"><a class="indicator-title">Switch up status</a><p id="El_stow_preDn-status"></p></div>
                            <div class="indicator" id="El-state-indicator"><a class="indicator-title">Elevation axis state</a><p id="El-state-status"></p></div>
                            <div class="indicator" id="El_stow_posOk-indicator"><a class="indicator-title">Stow pos #2 reached</a><p id="El_stow_posOk-status"></p></div>
                            <div class="indicator" id="El_stowPin2-indicator"><a class="indicator-title">El axis Pin2 status</a><p id="El-stowPin2-status"></p></div>
                            <div class="indicator" id="El_stow_preUp-indicator"><a class="indicator-title">Switch down status</a><p id="El_stow_preUp-status"></p></div>
                        </div>
                        <div id="acu-indicator-container-2">
                            <div class="az-container">
                                <table>
                                    <tr>
                                        <th class="table-heading" style="text-align:center;" id="Az_des_pos_vel" colspan="2"></th>
                                    </tr>
                                    <tr>
                                        <td>Destination</td>
                                        <td class="acu-numbers" id="Az_des" ></td>
                                    </tr>
                                    <tr>
                                        <td>Position</td>
                                        <td class="acu-numbers" id="Az_pos" ></td>
                                    </tr>
                                        <td>Velocity</td>
                                        <td class="acu-numbers" id="Az_vel" ></td>
                                    </tr>
                                </table>
                                <br>
                                <table>
                                    <tr>
                                        <th class="acu-offset-numbers table-heading"  id="AzOffsets" colspan="2"></th>
                                    </tr>
                                    <tr>
                                        <td>Static</td>
                                        <td id="Az_pOffs" ></td>
                                    </tr>
                                    <tr>
                                        <td>Tracking</td>
                                        <td id="Az_trOffs" ></td>
                                    </tr>
                                </table>
                                <br>
                            </div>
                        <br>
                        </div>
                        <div id="acu-indicator-container-3">
                            <div class="el-container">
                                <table>
                                    <tr>
                                        <th  class="table-heading"  style="text-align:center;" id="El_des_pos_vel" colspan="2"></th>
                                    </tr>
                                    <tr>
                                        <td>Destination</td>
                                        <td class="acu-numbers" id="El_des" ></td>
                                    </tr>
                                    <tr>
                                        <td>Position</td>
                                        <td class="acu-numbers" id="El_pos" ></td>
                                    </tr>
                                        <td>Velocity</td>
                                        <td class="acu-numbers" id="El_vel" ></td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <br>
                                <table>
                                    <tr>
                                        <th class="acu-offset-numbers table-heading" id="ElOffsets" colspan="2"></th>
                                    </tr>
                                    <tr>
                                        <td>Static</td>
                                        <td id="El_pOffs" ></td>
                                    </tr>
                                    <tr>
                                        <td>Tracking</td>
                                        <td id="EL_trOffs" ></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div id="acu-indicator-container-4">
                            <p id="trTable_index"></p>
                            <p id="offTable_index"></p>
                        </div>
                    </div>
                </div>
                <div id="snackbar"></div>
                <div id="message-box"></div>
                <div id="container" class='container'>
                    <div class='loader'>
                        <div class='loader--dot'></div>
                        <div class='loader--dot'></div>
                        <div class='loader--dot'></div>
                        <div class='loader--dot'></div>
                        <div class='loader--dot'></div>
                        <div class='loader--dot'></div>
                        <div class='loader--text'></div>
                    </div>
                </div>
                <div id='mask'></div>
                <div id="error-area">
                    <button id="show-status">Custom status</button>  
                    <p id="acu-error" style="margin: 10px 5% 10px 5%;"></p>
                </div>
            </section>
            <section class="acu-data" id="rxc-data" style="overflow-y:auto;height:100vh;">
                <br><br><br>
                <h3 id="rxc-heading">RXC receiver status</h3>
                <input type='button' id='hideshow' value='Toogle alarms'>
                    <div id="alarm-container">
                        <div id="alarm-contents">
                            <div id="alert-label">
                                <p>Active alarms</p>
                            </div>
                        <?php
                            $alarmCount = 18;
                            for($i=1; $i<$alarmCount+1; $i++){
                                echo "<div class='alarm-text-ind' id='alarm-text-ind-{$i}'>";
                                echo "  <div class='alarm-indicator' id='rxc-alarm-{$i}'>";
                                echo "      <div class='tooltiptext' id='rxc-alarm-text-{$i}'></div>";
                                echo "  </div>";
                                echo "</div>";
                            }
                        ?>
                        </div>
                    </div>
                    <div id="rxc-container">
                        <div>
                            <table class="rxc-status-table">
                                <tr>
                                    <th id="rxc-temperature-a-label" ></th>
                                </tr>
                                <tr>
                                    <td id="rxc-temperature-a" ></td>
                                </tr>
                            </table>

                            <table class="rxc-status-table">
                                <tr>
                                    <th id="rxc-temperature-b-label" ></th>
                                </tr>
                                <tr>
                                    <td id="rxc-temperature-b" ></td>
                                </tr>
                            </table>

                            <table class="rxc-status-table">
                                <tr>
                                    <th id="rxc-vacuum-label" ></th>
                                </tr>
                                <tr>
                                    <td id="rxc-vacuum" ></td>
                                </tr>
                            </table>
                            <table class="rxc-status-table">
                                <tr>
                                    <th id="rxc-frequency-label" ></th>
                                </tr>
                                <tr>
                                    <td id="rxc-frequency" ></td>
                                </tr>
                            </table>
                        </div>
                        <table class="rxc-status-table">
                            <tr>
                                <th id="rxc-oscilator-label" ></th>
                            </tr>
                            <tr>
                                <td id="rxc-oscilator" ></td>
                            </tr>
                        </table>
                        <table class="rxc-status-table">
                            <tr>
                                <th id="rxc-horn-pos-label" ></th>
                            </tr>
                            <tr>
                                <td id="rxc-horn-pos" ></td>
                            </tr>
                        </table>
                        <table class="rxc-status-table">
                            <tr>
                                <th id="rxc-system-status-label" ></th>
                            </tr>
                            <tr>
                                <td id="rxc-system-status" ></td>
                            </tr>
                        </table>
                    </div>
                    <div id="onoff-container">
                        <?php   
                            $onOffCount = 9;

                            for($i=1; $i<$onOffCount+1; $i++){
                                echo "<div class='onoff-btn'>";
                                echo "  <p id='onoff-name-{$i}'></p>";
                                echo "  <div class='btn' id='btn-{$i}'>?";
                                echo "  </div>";
                                echo "</div>";
                            }
                        ?>
                    </div>
            </section>
            <section class="page-wrappe" id="page-wrappe">
                <br><br><br>
                <div class="container-fluid">
                    <div class="row page-titles">
                        <div class="col-md-5 col-8 align-self-center">
                            <h3 class="text-themecolor m-b-0 m-t-0">Meteo station data</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="card" id=card>
                                <div class="card-block"  id="card-block">
                                    <form id="myform"  method="POST"  class="form_statusinput">
                                        <input type="datetime-local" name="yesterday" id="yesterday"/>
                                        <input type="datetime-local" name="now" id="now"/>
                                        <span id="button-container">
                                            <input type="submit" class="submit-button" id="button" value="Show">
                                            <button type="button" onclick="changeInterval('lasthour', true)" class="range-button">Last hour</button>
                                            <button type="button" onclick="changeInterval('last12h', true)" class="range-button">Last 12 hours</button>
                                            <button type="button" onclick="changeInterval('yesterday', true)" class="range-button">Last 24 hours</button>
                                            <button type="button" onclick="changeInterval('lastweek', true)" class="range-button">Last week</button>
                                        </span>
                                    </form><br /><br />
                                    <h3>Current data</h3>
                                    <p id="lastTime"></p>
                                    <div style="float:right; display: flex">
                                        <div style="padding-right: 3%;">
                                            <p id="lastRain"></p>
                                            <p id="lastVoltage"></p>
                                            <p id="lastWindGust"></p>
                                        </div>
                                        <div style="padding-right: 3%;"> 
                                            <p id="lastHumidity"></p>
                                            <p id="lastTemperature"></p>
                                            <p id="lastSolarRadiation"></p>
                                        </div>
                                        <div>
                                            <p id="lastWindSpeed"></p>
                                            <p id="lastWindSpeedCount"></p>
                                            <p id="lastWindDirection" ></p>
                                            <p id="lastPressure"></p>
                                        </div>
                                        <div>
                                            <input id="more-button" value="Show more">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br><br>
                            <div class="card">
                                <div id="left" class="left-line-chart-container card-child">
                                    <div class="card-block" style="padding: 2% 0% 1% 1%;">
                                        <canvas id="chart1"></canvas><br/>
                                    </div>
                                    <div class="card-block" style="padding:0% 0% 1% 1%;">
                                        <canvas id="chart3"></canvas><br/>
                                    </div>
                                    <div class="card-block" style="padding:0% 0% 1% 1%;">
                                        <canvas id="chart5"></canvas><br/>
                                    </div>
                                    <div class="card-block" style="padding:0% 0% 1% 1%;">
                                        <canvas id="chart7"></canvas><br/>
                                    </div>
                                    <div class="card-block" style="padding:0% 0% 1% 1%;">
                                        <canvas id="chart9"></canvas><br/>
                                    </div>
                                </div>
                                <div id="right" class="right-line-chart-container card-child">
                                    <div class="card-block" style="padding:2% 1% 1% 0%;">
                                        <canvas id="chart2"></canvas><br/>
                                    </div>
                                    <div class="card-block" style="padding:0% 1% 1% 0%;">
                                        <canvas id="chart4"></canvas><br/>
                                    </div>
                                    <div class="card-block" style="padding:0% 1% 1% 0%;">
                                        <canvas id="chart6"></canvas><br/>
                                    </div>
                                    <div class="card-block" style="padding:0% 1% 1% 0%;">
                                        <canvas id="chart8"></canvas><br/>
                                    </div>
                                    <div class="card-block" style="padding:0% 1% 1% 0%;">
                                        <canvas id="chart10"></canvas><br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </section>
            <section class="meteo-data" id="meteo-data" style="overflow-y:auto;height:100vh;">
                <br><br><br>
                <h3>Meteo scatter data</h3>
                <div class="form-group">
                    <select class="form-control" id="sel1" onchange="changeTypeForScatter(this)">
                        <option value="humidity">Humidity</option>
                        <option value="temperature">Temperature</option>
                        <option value="bar_pressure">Atmospheric pressure</option>
                        <option value="wind_speed">Wind speed</option>
                        <option value="wind_gust">Wind gust</option>
                        <option value="wind_speed_count">Wind speed count</option>
                        <option value="wind_direction">Wind direction</option>
                        <option value="rain">Rain</option>
                        <option value="input_voltage">Input voltage</option>
                        <option value="solar_radiation">Solar radiation</option>
                    </select>
                </div>
                <div class="card-block ct-chart" id="ct-chart" style="padding: 2% 0% 1% 1%; height:70%;">
                 </div>
            </section>
        <script src="src/js/external_lib/jquery.slimscroll.js"></script>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <script src="src/js/charts.js"></script>

        <script>
            $(document).ready(function(){

                showRT16();
                getLatestStatus();


                $('#rt16button').click(function(){
                    showRT16();
                });
                $('#rt32button').click(function(){
                    showRT32();
                });

                $("#show-status").click(function() {
                    showPopupWithStatus();
                });
                showPopup

                $("#error-area").click(function() {
                    showPopup();
                });

                $("#mask").click(function() {
                    closeErrorPopup();
                });

                $(document).keyup(function(e) {
                    if (e.keyCode == 27) { // escape key maps to keycode `27`
                        closeErrorPopup();
                    }
                });


                var scrollLink = $('.scroll');
                scrollLink.click(function(e) {
                    e.preventDefault();
                    $('body,html').animate({
                        scrollTop: $(this.hash).offset().top
                    }, 500 );
                });
                
                $(window).scroll(function() {
                    var scrollbarLocation = $(this).scrollTop();
                    scrollLink.each(function() {
                        var sectionOffset = $(this.hash).offset().top - 20;
                        if ( sectionOffset <= scrollbarLocation ) {
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                        }
                    });
                });
                
                $("form#myform").submit(function(event) {
                    event.preventDefault();
                    var yesterday = $("#yesterday").val();
                    var now = $("#now").val();
                    var currentInterval = yesterday+"+"+now;
                    changeInterval(currentInterval, false);
                });

                $(function() {
                    $('#more-button').hover(function() {
                        $('#card').css('height', '330');
                        $('#more-button').css('background', 'linear-gradient(to top right, #1256d6, #1e90ff)');
                    }, function() {
                        $('#card').css('height', '190');
                        $('#more-button').css('background', 'linear-gradient(to bottom right, #1256d6, #1e90ff)');
                    });
                });
                // more functions welcome here


                // end
            });
        </script>
        
        <script src="src/js/rxc.js"></script>
        <script src="src/js/acu.js"></script>
        <script src="src/js/event_stream_client.js"></script>

    </body>
</html>
