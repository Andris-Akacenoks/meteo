<!doctype html>

<html>
<head>
</head>
    <body>

    <div id="show"></div>
    <script type="text/javascript" src="../lib/plugins/jquery/jquery.min.js"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            setInterval(function (){
                $("#show").load("dbconfig.php")
            }, 3000);
        });
        </script>
        


    </body>
</html>