
<?php /* connect to gmail */
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    


    /* try to connect */
    if(isset($_GET)){
        $hostname = '{imap.gmail.com:993/imap/ssl}INBOX';
        $username = 'irbene.bot@gmail.com';
        $password = 'Irbene.Imap';

            $inbox = imap_open($hostname,$username,$password) or die('Cannot connect to Gmail: ' . imap_last_error());

            $emails = imap_search($inbox,'ALL');
    
            if($emails) {
    
                /* for every email... */
                // foreach($emails as $email_number) {
                    
                //     /* get information specific to this email */
                //     $overview = imap_fetch_overview($inbox,$email_number,0);
                //     $message = imap_fetchbody($inbox,$email_number,2);
                    
                //     echo "=======EMAIL CONTENTS=======";
                //     echo "<br />Subject: ";
                //     echo $overview[0]->subject;
                    
                //     echo "<br />From: ";
                //     echo $overview[0]->from;
                    
                //     echo "<br />Date: ";
                //     echo $overview[0]->date;
                    
                //     echo "<br />Message: ";
                //     echo $message;
    
                // }
                $message = imap_fetchbody($inbox,$emails[sizeof($emails)-1],2);
                print json_encode(strip_tags($message));
                
            } 
        
        imap_close($inbox);
    }

    /* close the connection */
    // surce: https://davidwalsh.name/gmail-php-imap
?>