<?php
    
    ini_set("display_errors", 1); 
        
    if( !isset($_SERVER['HTTP_X_REQUESTED_WITH']) ) {
        return;
    }
    
    if ( trim($_POST['valTrFal']) != 'valTrFal_true' ) {
        echo 'Need to Confirm your post.';
        return;
    }

    if( !isset($_POST['txtname']) || !isset($_POST['txtemail']) || !isset($_POST['message']) ) {  
        echo 'All Fields are required';
        return;
    }
    
    $to = 'bitdust.io@gmail.com';
    $txtname = filter_var($_POST['txtname'], FILTER_SANITIZE_STRING);
    $themsLat = 'message received from [bitdust.io]';
    $txtemail = filter_var($_POST['txtemail'], FILTER_SANITIZE_STRING);
    $comments = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    $b = '<html><head>';
    $b = $b . '<title>' . $themsLat . '</title>';
    $b = $b . '<p>IP: <b>' . $_SERVER['REMOTE_ADDR'] . '</b></p>';
    $b = $b . '<p>Name: <b>' . $txtname . '</b></p>';
    $b = $b . '<p>E-mail: <b>' . $txtemail . '</b></p>';
    $b = $b . '<br><p>' . $comments . '</p>';
    $b = $b . '</head><body>';

    $header = array();
    $header[] = "MIME-Version: 1.0";
    $header[] = "From: {$to}<{$to}>";
    $header[] = "Content-type:text/html; charset=utf-8";
    $header[] = "Content-Transfer-Encoding: 7bit";
    
    if ( !mail($to, 'message received from [bitdust.io]', $b, implode("\r\n", $header)) ) {
        echo 'Message couldn\'t sent!';
        return; 
    }

    echo 'Message sent.';
  
?>