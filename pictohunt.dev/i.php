<?php

/* be sure to require `hashids` in your `composer.json` file first */
require_once(__DIR__.'/lib/Hashids/Hashids.php');

/* create the class object */
$hashids = new Hashids\Hashids('hi from Govhack in cairns 8',4); // min 4 chars

/* encode one number */
$id = $hashids->encode(1);

/* `$id` is always a string */
var_dump($id);


$realid = array_pop($hashids->decode($id."d"));
if($realid == NULL) echo("NULL");
print_r($realid);
var_dump($realid);
exit;
