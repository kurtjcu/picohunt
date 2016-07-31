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




//echo("<pre>ID=$id\nREALID=$realid\n");print_r($config);echo("</pre>");

$imgs="";

foreach($config['photos'] as $i => $img) {


$imgs.='<div class="col-100 tablet-50 desktop-33"><div class="card ks-card-header-pic">
        <a class="link pic-container" href="/match.html?'.$i.'"><div class="card-header color-white no-border lazy-fadein"  data-background="'.$img['f'].'" style="background-image: url('.$img['f'].')"> </div></a>
        <div class="card-content"> 
          <div class="card-content-inner"> 

            <p>'.$img['name'].'</p>
          </div>
        </div>
        <div class="card-footer"><a class="" href="#"><i class="icon-heart-empty"></i></a><a class="link" href="/match.html?'.$i.'">Match</a></div>
      </div></div>';
      
}

echo("<h2>Points: {$config['points']}</h2>".'<div class="content-block">
<div class="row">'. $imgs.'</div></div>');


?>