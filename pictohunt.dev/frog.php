<?php

$latlon ="lat=-16.9206088&lon=145.7314278&radius=5";
$group="Amphibians";


$explore=json_decode(file_get_contents("http://biocache.ala.org.au/ws/explore/group/$group?$latlon&fq=geospatial_kosher%3Atrue&qc=&pageSize=5000"),1);


$explore=json_decode(file_get_contents("http://biocache.ala.org.au/ws/occurrence/facets?facets=taxon_name,image_url,id&?$latlon&flimit=50"),1);


echo("<pre>");

print_r($explore);



/*

[0] => Array
        (
            [rank] => SPECIES
            [kingdom] => Animalia
            [guid] => urn:lsid:biodiversity.org.au:afd.taxon:f5dd054a-f218-446f-8ab1-b91383dae9e9
            [family] => Microhylidae
            [commonName] => Rain Frog
            [count] => 2
            [name] => Austrochaperina pluvialis
        )

    [1] => Array
        (
            [rank] => SPECIES
            [kingdom] => Animalia
            [guid] => urn:lsid:biodiversity.org.au:afd.taxon:536399c9-5f60-40fc-b5ec-da7ecc904461
            [family] => Microhylidae
            [commonName] => Dull Frog
            [count] => 1
            [name] => Cophixalus infacetus
        )

    [2] => Array
        (
            [rank] => SPECIES
            [kingdom] => Animalia
            [guid] => urn:lsid:biodiversity.org.au:afd.taxon:28a22672-f4cb-4e42-a006-ff7978f0d562
            [family] => Microhylidae
            [commonName] => Northern Ornate Nursery-frog
            [count] => 7
            [name] => Cophixalus ornatus
        )


*/
?>

