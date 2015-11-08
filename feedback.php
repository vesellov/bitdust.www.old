<?php
    
ini_set("display_errors", 1); 
    
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    
    if (trim($_POST['valTrFal'])!='valTrFal_true') {
    
        //echo '<script language="JavaScript">window.location.href="/";</script>';
        return false;
        
    } else {
    
        if( isset($_POST['btnsend']) ) {
                $mailto = "bitdust.io@gmail.com"; 
                $charset = 'utf-8';
                $headers = "Content-type: text/plain; charset={$charset}\n";		
                $headers .= "From: bitdust.io@gmail.com";
                //$txtname = trim($_POST['txtname']);
                $txtname = filter_var($_POST['txtname'], FILTER_SANITIZE_STRING);
                $themsLat = 'message received from [bitdust.io]';
                //$txtemail = trim($_POST['txtemail']);
                $txtemail = filter_var($_POST['txtemail'], FILTER_SANITIZE_STRING);
                //$comments = trim($_POST['message']);
                $comments = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

                $body = $themsLat . '\n\n';
                $body = $body . 'IP: ' . $_SERVER['REMOTE_ADDR'] . '\n\n';
                $body = $body . 'Name: ' . $txtname . '\n\n';
                $body = $body . 'E-mail: ' . $txtemail . '\n\n';
                $body = $body . 'Message: \n\n' . $comments; 
          
                mail($mailto, $themsLat, $body, $headers);
                //mail($mailto,'=?'.$charset.'?B?'.base64_encode($themsLat).'?=',$body,$headers);
        
                //echo '<script language="JavaScript">window.location.href="/";</script>';
                return true;

        } else {
            return false;
        }
    }
} else {
    return false;
}

?>