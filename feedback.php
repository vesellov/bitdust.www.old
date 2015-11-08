<?php
    
ini_set("display_errors", 1); 
    
if (trim($_POST['valTrFal'])!='valTrFal_true') {
	//echo '<script language="JavaScript">window.location.href="/";</script>';
    return false;
    
} else {
	
	if(isset($_POST['btnsend'])) {

			$mailto = "bitdust.io@gmail.com"; 
			$charset = 'utf-8';
			$headers = "Content-type: text/plain; charset={$charset}\n";		
			$headers .= "From: bitdust.io@gmail.com";
			$txtname = trim($_POST['txtname']);

            $themsLat = 'message received from [bitdust.io]';

			$txtemail = trim($_POST['txtemail']);

			$comments = trim($_POST['message']);

            $body = $themsLat . '\n\n';
            $body = $body . 'IP: ' . $_SERVER['REMOTE_ADDR'] . '\n\n';
            $body = $body . 'Name: ' . $txtname . '\n\n';
            $body = $body . 'E-mail: ' . $txtemail . '\n\n';
            $body = $body . 'Message: \n\n' . $comments; 
      
			mail($mailto,$themsLat,$body,$headers);
			//mail($mailto,'=?'.$charset.'?B?'.base64_encode($themsLat).'?=',$body,$headers);
	
			//echo '<script language="JavaScript">window.location.href="/";</script>';
            return true;

	}
}

?>