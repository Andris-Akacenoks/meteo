<html>
    <head>


    </head>
    <body>

    
        <?php

            $address="193.105.155.166";
            $port="8888";
            $msg="Hello server";

            $sock=socket_create(AF_INET,SOCK_STREAM,0) or die("Cannot create a socket");
            socket_connect($sock,$address,$port) or die("Could not connect to the socket");
            socket_write($sock,$msg);

            $read=socket_read($sock,1024);
            echo $read;
            socket_close($sock);

        ?>

        <script>

        
        </script>
    </body>


</html>