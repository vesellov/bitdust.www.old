# if request sent using HTTP_X_REQUESTED_WITH
if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ){
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
  }
  else {
    echo 'All Fields are required';
  }
  return;
}

/**
 * Email send with headers
 *
 * @return bool | void
 **/
function email($to, $address, $message){
  $header = array();
  $header[] = "MIME-Version: 1.0";
  $header[] = "From: {$to}<{$to}>";
  /* Set message content type HTML*/
  $header[] = "Content-type:text/html; charset=iso-8859-1";
  $header[] = "Content-Transfer-Encoding: 7bit";
  if( mail($to, 'Message received from http://BitDust.IO', $address . '\r\n\r\n' . $message, implode("\r\n", $header)) )
      return true; 
  return false;
}