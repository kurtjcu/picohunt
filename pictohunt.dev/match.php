<?php

require_once("lib/config.php");

session_start();




$id = isset($_GET['id']) ? trim($_GET['id']) : "3elP";


//
$realid = array_pop($hashids->decode($id));


if($realid == NULL) exit("WRONG ID $realid");

$_SESSION['user']=array('id'=>$id);



// check if new user >> create a folder and config file
$basedir = dirname(__FILE__);

$userconfigfile ="$basedir/users/$id/".md5($realid.$hashsalt).".conf.json";

if( !is_dir("$basedir/users/$id"))  {

mkdir("$basedir/users/$id");

file_put_contents($userconfigfile,json_encode( array("joined"=>date("Y-m-d H:i"))));


}

$config = json_decode(file_get_contents($userconfigfile),1);




echo("<pre>ID=$id\nREALID=$realid\n");

print_r($config);

echo("</pre>");




?>