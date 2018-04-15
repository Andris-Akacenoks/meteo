
<?php /* connect to gmail */
    $hostname = '{imap.gmail.com:993/imap/ssl}INBOX';
    $username = 'irbene.bot@gmail.com';
    $password = 'Irbene.Imap';

    /* try to connect */
    $inbox = imap_open($hostname,$username,$password) or die('Cannot connect to Gmail: ' . imap_last_error());

    /* grab emails */
    $emails = imap_search($inbox,'ALL');

    /* if emails are returned, cycle through each... */
    if($emails) {
        
        /* begin output var */
        $output = '';
        
        /* put the newest emails on top */
        rsort($emails);
        
        /* for every email... */
        foreach($emails as $email_number) {
            
            /* get information specific to this email */
            $overview = imap_fetch_overview($inbox,$email_number,0);
            $message = imap_fetchbody($inbox,$email_number,2);
            
            /* output the email header information */
            echo "=======EMAIL CONTENTS=======";
            echo "<br />Subject: ";
            echo $overview[0]->subject;
            
            echo "<br />From: ";
            echo $overview[0]->from;
            
            echo "<br />Date: ";
            echo $overview[0]->date;
            
            echo "<br />Message: ";
            echo $message;

        }
        
    } 

    /* close the connection */
    imap_close($inbox);

    // surce: https://davidwalsh.name/gmail-php-imap
?>