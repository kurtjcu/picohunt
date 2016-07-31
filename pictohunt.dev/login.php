<?php

require_once("lib/config.php");

session_start();

// get login and set session internal user ID based on FB uid


$uid = isset($_GET['uid']) ? trim($_GET['uid']) : false;

if ($uid === false) exit;

// look for map
$fn = md5($uid.$hashsalt);

$new=false;

if(!file_exists("fbmap/$fn.txt")) {

// counter
if(!file_exists("fbmap/counter.txt")) file_put_contents("fbmap/counter.txt",0, LOCK_EX);

$realid = file_get_contents("fbmap/counter.txt")*1+1;
file_put_contents("fbmap/counter.txt",$realid, LOCK_EX);

file_put_contents("fbmap/$fn.txt", $realid);
$new=true;
} else $realid = file_get_contents("fbmap/$fn.txt");

$id = $hashids->encode($realid);
$_SESSION['user']=array('id'=>$id);



// check if new user >> create a folder and config file
$basedir = dirname(__FILE__);

$userconfigfile ="$basedir/users/$id/".md5($realid.$hashsalt).".conf.json";

if( !is_dir("$basedir/users/$id"))  {

mkdir("$basedir/users/$id");

file_put_contents($userconfigfile,json_encode( array("joined"=>date("Y-m-d H:i"),"name"=>$_GET['name'],"points"=>0)));


}

$config = json_decode(file_get_contents($userconfigfile),1);

$photos = count($config['photos']);


exit("name: {$config['name']}; photos: $photos, points: {$config['points']}");


?>