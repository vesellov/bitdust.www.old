<?php
    
    ini_set("display_errors", 1); 
        
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
      if (isset($_POST['message']) AND isset($_POST['address'])) {
        $to = 'bitdust.io@gmail.com';

        $address = filter_var($_POST['address'], FILTER_SANITIZE_STRING);
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

        $sent = email($to, $address, $message);
        if ($sent) {
          echo 'Message sent!';
        } else {
          echo 'Message couldn\'t sent!';
        }
      } else {
        echo 'All Fields are required';
      }
      return;
    }

    function email($to, $address, $message){
      $header = array();
      $header[] = "MIME-Version: 1.0";
      $header[] = "From: {$to}<{$to}>";
      $header[] = "Content-type:text/html; charset=iso-8859-1";
      $header[] = "Content-Transfer-Encoding: 7bit";
      $body = '<html><head><title>message received from [bitdust.io]</title></head><body>';
      $body = $body . '<br>IP: <b>' . $_SERVER['REMOTE_ADDR'] . '</b><br>';
      $body = $body . '<br><b>' . $address . '</b><br>';
      $body = $body . '<br>Message: <br><br>' . $message;
      if(mail($to, 'message received from [bitdust.io]', $body, implode("\r\n", $header)))
          return true; 
      return false;
    }
  
 
/*      
        
    //if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    if (1) {
        
        if (trim($_POST['valTrFal'])!='valTrFal_true') {
        
            echo '<script language="JavaScript">window.location.href="/";</script>';
            //return false;
            
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
            
                    echo '<script language="JavaScript">window.location.href="/";</script>';
                    //return true;

            } else {
                echo '<script language="JavaScript">window.location.href="/";</script>';
                //return false;
            }
        }
    } else {
        return false;
    }
*/
?>