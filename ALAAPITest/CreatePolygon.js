var lat = -16.869750;
var lon = 145.6944433;
var size = .005; //.01 = approx 1klm from origin
var PolyString;


function CreatePolygon() {

    var pola = (lat - size) + " " + (lon + size);
    var polb = (lat + size) + " " + (lon + size);
    var polc = (lat + size) + " " + (lon - size);
    var pold = (lat - size) + " " + (lon - size);

    console.log(pola + " " + polb + " " + polc + " " + pold);
}
