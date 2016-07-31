var pLat = -16.869750;
var pLon = 145.6944433;
var pSize = .005; //.01 = approx 1klm from origin
var PolyString;
var polAns = "none";


function CreatePolygon(lat, lon, size) {

    var pola = (lon - size).toFixed(3) + " " + (lat - size).toFixed(3);
    var polb = (lon + size).toFixed(3) + " " + (lat - size).toFixed(3);
    var polc = (lon + size).toFixed(3) + " " + (lat + size).toFixed(3);
    var pold = (lon - size).toFixed(3) + " " + (lat + size).toFixed(3);

    polAns = pola + "," + polb + "," + polc + "," + pold + "," + pola;

    PolyString = "wkt=POLYGON((" + polAns + "))";

}
