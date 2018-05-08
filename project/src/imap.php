
<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    
    if(isset($_GET)){
        $hostname = '{imap.gmail.com:993/imap/ssl}INBOX';
        $username = 'irbene.bot@gmail.com';
        $password = 'Irbene.Imap';

        $inbox = imap_open($hostname,$username,$password) or die('Cannot connect to Gmail: ' . imap_last_error());
        $emails = imap_search($inbox,'ALL');

        if($emails) {
            $message = imap_fetchbody($inbox,$emails[sizeof($emails)-1],2);
            print json_encode(strip_tags($message));
        } 
        
        imap_close($inbox);
    }
    // surce: https://davidwalsh.name/gmail-php-imap
?>