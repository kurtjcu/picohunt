// Initialize your app
var myApp = new Framework7({
pushState: true,
modalTitle: "Pictohunt"

});

var allspecies={};
var lat,lon;
var radius =5;

// Export selectors engine
var $$ = Dom7;

// http://code.hootsuite.com/html5/

function readFile(file) {
	var reader = new FileReader();

	reader.onloadend = function () {
		processFile(reader.result, file.type);
	}

	reader.onerror = function () {
		alert('There was an error reading the file!');
	}

	reader.readAsDataURL(file);
}

function processFile(dataURL, fileType) {
	var maxWidth = 800;
	var maxHeight = 800;

	var image = new Image();
	image.src = dataURL;

	image.onload = function () {
		var width = image.width;
		var height = image.height;
		var shouldResize = (width > maxWidth) || (height > maxHeight);

		if (!shouldResize) {
			sendFile(dataURL);
			return;
		}

		var newWidth;
		var newHeight;

		if (width > height) {
			newHeight = height * (maxWidth / width);
			newWidth = maxWidth;
		} else {
			newWidth = width * (maxHeight / height);
			newHeight = maxHeight;
		}

		var canvas = document.createElement('canvas');

		canvas.width = newWidth;
		canvas.height = newHeight;

		var context = canvas.getContext('2d');

		context.drawImage(this, 0, 0, newWidth, newHeight);

		dataURL = canvas.toDataURL(fileType);

		sendFile(dataURL);
	};

	image.onerror = function () {
		alert('There was an error processing your file!');
	};
}


function sendFile(fileData) {
	var formData = new FormData();

	formData.append('imageData', fileData);

myApp.showPreloader();

	$$.post('/upload.php',formData,function (data) {
		console.log(data);
		myApp.hidePreloader();
		var dj = JSON.parse(data);
		// success - function (data, status, xhr) - A callback function that is executed if the request succeeds. Optional
			if (dj.img) {
				// alert('Your file was successfully uploaded!');
				$$('#uploadedimg').html('<img src="'+dj.img+'" />');
			} else {
				alert('There was an error uploading your file!');
			}
		}
	);
	
	
}






/*

			Google map API
*/


var markers = [];
var infowindows = [];
var mydata =[];
var map;
var thisPoints =[];
function allmarkers(m){






}

function updatemarkers(data){
deleteMarkers();
//console.log(data);
for(var i = 0; i < data.length; i++){
d=data[i];
//console.log(d);
pos=d['l'].split(',');
//console.log(pos);
thisPoints[i] = {lat: parseFloat(pos[0]), lng: parseFloat(pos[1])};
//console.log(thisPoint);
 var tmarker = new google.maps.Marker({
          position: thisPoints[i],
          map: map
         ,title: d['t']
        });
        infowindows[i] = new google.maps.InfoWindow({
          content: d['d'],
          maxWidth: 200,
          position: thisPoints[i]
        });
	tmarker['index']=i;
       tmarker.addListener('click', function() {
       console.log(this['index']);
          infowindows[this['index']].open(map, markers[this['index']]);
        });
     //  tmarker.setMap(map);
markers.push(tmarker);

}
showMarkers();
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
  infowindows = [];
  thisPoints =[];
}


var timer;

function initMap() { console.log("map script loaded"); }

function xinitMap() {
        var thisPoint = {lat: -33.0919447, lng: 148.8684744};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: thisPoint
        });

map.addListener('idle', function(m){

// console.log(map.getBounds().toJSON());
// console.log(map.getBounds().toString());
 var spherical = google.maps.geometry.spherical, 
    bounds = map.getBounds(), 
    cor1 = bounds.getNorthEast(), 
    cor2 = bounds.getSouthWest(), 
    cor3 = new google.maps.LatLng(cor2.lat(), cor1.lng()), 
    cor4 = new google.maps.LatLng(cor1.lat(), cor2.lng()), 
    width = spherical.computeDistanceBetween(cor1,cor3), 
    height = spherical.computeDistanceBetween( cor1, cor4),
    w = Math.round(Math.min(width,height)/1000),
    u='c='+(map.getCenter().toString()).replace(/[ \(\)]/g,'')+'&d='+w;
    // &latlong=-27,153&dist=50
  

});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        myApp.alert( "Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude);
    var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // using global variable:
    map.panTo(center);
    var marker = new google.maps.Marker({
          position: center,
          map: map,
          title: 'Here we are!'
        });

    // http://biocache.ala.org.au/ws/explore/groups  
    
    myApp.showPreloader();
    
    
    // http://biocache.ala.org.au/ws/explore/groups.json?callback=jQuery18309452853945274603_1469846218779&lat=-27.6&lon=141&radius=5&fq=geospatial_kosher%3Atrue&facets=species_group&qc=&_=1469846228964
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    
    
    $$.getJSON("https://biocache.ala.org.au/ws/explore/groups.json", {lat:position.coords.latitude,lon:position.coords.longitude, radius:radius, facets:"species_group"}, function(data){
    console.log(data);
    
    allspecies = data;
    
    var report="";
    var relsize=0;
    var maxsize=40;
    $$.each(data, function (key, value) {
    
    if (relsize==0) relsize = value['speciesCount'];
    // style=\"font-size:"+(value['speciesCount']/relsize*maxsize)+"px\"
    report+="<h3 >"+ value['name'] +" <i class=\"badge\">"+value['speciesCount']+"</i></h3> ";
    
    })
    
    var popupHTML = '<div class="popup">'+
                    '<div class="content-block"><p><a href="#" class="close-popup">Close me</a></p>'+
                      '<p>'+report+'</p>'+
                      ''+
                    '</div>'+
                  '</div>'
  myApp.popup(popupHTML);
    myApp.hidePreloader();
    });
}



   getLocation();
        
      }

/*

			/Google map API
*/



function listformatch(group){
// taxon_name,image_url,id
u="http://biocache.ala.org.au/ws/occurrence/facets?facets=taxon_name,image_url,id&lat="+lat+"&lon="+lon+"&radius="+radius+"&flimit=50";

 $$.getJSON("http://biocache.ala.org.au/ws/occurrence/facets", {lat:lat,lon:lon, radius:radius, facets:"species_group"}, function(data){
    console.log(data);
});


}


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

myApp.onPageInit('map', function (page) {
    xinitMap();
 });
// goto page mainView.router.loadPage('about.html');





myApp.onPageInit('dashboard', function (page) {
     myApp.showPreloader();
 $$.get('user.php', {}, function (data) {
  $$('#dashcontent').html(data);
   myApp.hidePreloader();
   $$('lazy').trigger('lazy');
});
})


myApp.onPageInit('match', function (page) {
     myApp.showPreloader();
     
     
     // gen popup species
     
     
     // allspecies
     
     $$.get('match.php' , {img:location.hash.split("?")[1].trim()}, function (data) {
  $$('#preview').html(data);
});
     
     
     var spiecespick=[];
     var sublevelname="";
    $$.each(allspecies, function (key, value) {
     if(value['level']==1) sublevelname = value['name'];
   if(value['level']==2) spiecespick.push(sublevelname + " ~ " +value['name'] + " ("+value['speciesCount']+")")
    
    })
   
     
     
     var pickerDevice = myApp.picker({
    input: '#picker-species',
    onClose: function () { group = $$('#picker-species').val().split("~")[1].split("(")[0].trim(); console.log(group) },
    cols: [
        {
            textAlign: 'left',
            values: spiecespick
        }
    ]
});
     
     
 $$.get('match.php', {}, function (data) {
  $$('#matchcontent').html(data);
   myApp.hidePreloader();
});
})





// Callbacks to run specific code for specific pages, for example for About page:

// http://code.hootsuite.com/html5/

// take a photo


myApp.onPageInit('camera', function (page) {
    
    
    // for non compatible
     if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
    $$.get('noupload.php', {}, function (data) {
  $$('#camerauploadmsg').html(data);
});

       
}
    
    
						if (window.File && window.FileReader && window.FormData) {
						var inputField = $$('#file');
						inputField.on('change', function (e) {
							var file = e.target.files[0];
							if (file) {
								if (/^image\//i.test(file.type)) {
									readFile(file);
								} else {
									alert('Not a valid image!');
								}
							}
						});
					} else {
					
					
	$$.get('noupload.php', {}, function (data) {
  $$('#camerauploadmsg').html(data);
});

						alert("File upload is not supported!");
					}
    
 // end file
        
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}