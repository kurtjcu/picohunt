<?php

require_once("lib/config.php");

session_start();

//print_r(($_POST['imageData']));exit;

$id = $_SESSION['user']['id'];
$basedir = dirname(__FILE__);


$realid = array_pop($hashids->decode($id));

if($realid == NULL) exit("WRONG ID $realid");

$userconfigfile ="$basedir/users/$id/".md5($realid.$hashsalt).".conf.json";

$config = json_decode(file_get_contents($userconfigfile),1);

if(!isset($config['counter'])) $config['counter']=0;

$config['counter']++;



if( !is_dir("$basedir/uimgs/$id"))  {
mkdir("$basedir/uimgs/$id", 0777, true);
}



$imagefilename = "/uimgs/$id/".$hashids->encode($realid,$config['counter']).".jpg";

$ifp = fopen($basedir.$imagefilename, "wb"); 

    $data = explode(',', $_POST['imageData']);
    fwrite($ifp, base64_decode($data[1])); 
    fclose($ifp); 


$config['photos'][$config['counter']]=array('f'=>$imagefilename);

// save config

file_put_contents($userconfigfile,json_encode($config));


echo("$imagefilename");

?>