<?php
if (trim($_POST['valTrFal'])!='valTrFal_true') {
	echo '<script language="JavaScript">window.location.href="/";</script>';
}
else {
	
	if(isset($_POST['btnsend'])) {

			$mailto = "bitdust.io@gmail.com"; 
			$charset = 'utf-8';
			$headers = "Content-type: text/plain; charset={$charset}\n";		
			$headers .= "From: feedback received from [bitdust.io]";

			$txtname = trim($_POST['txtname']);

			//$txtphone = trim($_POST['txtphone']);

			$txtemail = trim($_POST['txtemail']);

			$comments = trim($_POST['message']);

            $body = '<html><head><title>message received from [bitdust.io]</title></head><body>';
            $body = $body . '<br>IP: <b>' . $_SERVER['REMOTE_ADDR'] . '</b><br>';
            $body = $body . '<br>Name: <b>' . $txtname . '</b><br>';
            $body = $body . '<br>E-mail:<b>' . $txtemail . '</b><br>';
            $body = $body . '<br>Message: <br><br>' . $comments;
      
			mail($mailto,'=?'.$charset.'?B?'.base64_encode($themsLat).'?=',$body,$headers);
	
			echo '<script language="JavaScript">window.location.href="/";</script>';
	}
}

?>