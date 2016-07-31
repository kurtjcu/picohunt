var pLat = -16.869750;
var pLon = 145.6944433;
var pSize = .005; //.01 = approx 1klm from origin
var PolyString;
var polAns = "none";


function CreatePolygon(lat, lon, size) {

    var pola = (lat - size) + " " + (lon + size);
    var polb = (lat + size) + " " + (lon + size);
    var polc = (lat + size) + " " + (lon - size);
    var pold = (lat - size) + " " + (lon - size);

    polAns = pola + "," + polb + "," + polc + "," + pold + "," + pola;

    PolyString = "wkt=POLYGON((" + polAns + "))";

}
