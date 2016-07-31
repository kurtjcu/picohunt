<?php

/*



TODO: send picture via email

*/


require_once("lib/config.php");

session_start();




$id = isset($_GET['id']) ? trim($_GET['id']) : "3elP";


//
$realid = array_pop($hashids->decode($id));


if($realid == NULL) exit("WRONG ID");


$html = "<p>We are sorry, your device/browser is not able direct upload of photos</p><p>Please use this link to send photo via email:</p><p>
<a href=\"mailto:upload@pictohunt.com?subject=Keep%20this%20subject%20id#".$hashids->encode($realid,8,8,8)."\">email photo</a></p>";

exit($html);


?>