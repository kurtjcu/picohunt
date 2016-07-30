<?php

/*

config file


*/



$hashsalt = "hi from Govhack in cairns 8";

date_default_timezone_set('Australia/Brisbane');




require_once(__DIR__.'/Hashids/Hashids.php');

/* create the class object */
$hashids = new Hashids\Hashids($hashsalt,4);



?>