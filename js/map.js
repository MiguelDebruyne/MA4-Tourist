$('document').ready(init);

var initialLocation = null;
var browserSupportFlag = null;
var map = null;
var markers = null;
var directionsPanel = null;
var directionsService = null;
var directionsDisplay = null;

function init()
{
    trace('init');
    loadScript();
//    setInterval(testCurrentLocation, 5000);
}


function loadScript()
{
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?v=3.5&key=AIzaSyDsIg09Og_MHjm9FKcSoUV8G0WC9alhB_Y&sensor=true&callback=initializeMap";
    document.body.appendChild(script);
}


function testCurrentLocation()
{
    trace('test curr location');
    if(navigator.geolocation)
    {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position){
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setCenter(initialLocation);
            var latLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var route = {
                start: latLong,
                end: 'Fort Napoleon, Oostende, Belgie'
            };
            calcRoute(route);
        }, function() {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
}

function initializeMap()
{
    trace('initializeMap');

    markers = {
        start: new google.maps.MarkerImage(
            'style/images/circle.png',
            new google.maps.Size( 20, 20 ),
            new google.maps.Point( 0, 0 ),
            new google.maps.Point( 10, 10)
        )
    };
    var styles = [
        {
            stylers: [
                { hue: "#0077ff" },
                { gamma: 0.55 },
                { saturation: -60 }
            ]
        },{
            featureType: "road.arterial",
            stylers: [
                { hue: "#ff0000" },
                { lightness: 11 },
                { gamma: 1.25 },
                { saturation: -81 }
            ]
        }
    ];
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
    };
    var rendererOptions = {
        map: map,
        suppressMarkers: true,
        polylineOptions: {
            strokeWeight: 0,
            strokeColor:'#ff0000',
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '20px'
            }]
        }
    };
    var mapOptions = {
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
    };

    directionsPanel  = document.getElementById("directionsPanel");
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);
//    directionsDisplay.setPanel(directionsPanel);

//    chooseRoute();
    getUserLocation();
}


function chooseRoute()
{
    // Fort Napoleon -> Vismijn
    var route = {
        start: 'Fort Napoleon, Oostende, Belgie',
        end: 'Victorialaan, Oostende, Belgie',
        waypoints: [{
            location: "Vuurtorenweg, Oostende, Belgie",
            stopover: false
        },{
            location: "Fortstraat, Oostende, Belgie",
            stopover: false
        }]
    };

    calcRoute(route);
}


function calcRoute(route)
{
    var request = {
        origin: route.start,
        destination: route.end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        waypoints: route.waypoints,
        provideRouteAlternatives: false,
        avoidHighways: true
    };

    directionsService.route(request, function(response, status){
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var leg = response.routes[0].legs[0];
            makeMarker( leg.start_location, markers.start, "title" );
            makeMarker( leg.end_location, markers.start, 'title' );
        }
    });
}


function getUserLocation()
{
    trace('getUserLocation');
    if(navigator.geolocation)
    {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position){
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            var route = {
                start: initialLocation,
                end: 'Fort Napoleon, Oostende, Belgie'
            };

//            makeMarker(latLong, markers.start, "qsdf");
            calcRoute(route);
            map.setCenter(initialLocation);
        }, function() {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
}


function handleNoGeolocation(errorFlag)
{
    if (errorFlag == true) {
        window.alert("Geolocation service failed.");
    } else {
        window.alert("Your browser doesn't support geolocation");
    }
    map.setCenter(initialLocation);
}


function makeMarker(position, icon, title)
{
    new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title
    });
}


function trace(data)
{
    console.log(data);
}

//    var mapOptions =
//    {
//        zoom: 8,
//        center: new google.maps.LatLng(-34.397, 150.644),
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    };

// Vismijn -> Leopoldpark
//    var route = {
//        start: 'Victorialaan, Oostende, Belgie',
//        end: 'Leopoldpark, Oostende, Belgie',
//        waypoints: [{
//            location: "Dokter Eduard Moneauxlaan, Oostende, Belgie",
//            stopover: false
//        },{
//            location: "Stanleylaan, Vuurtorenwijk, Oostende, Belgie",
//            stopover: false
//        },{
//            location: "Schietbaanstraat, Oostende, Belgie",
//            stopover: false
//        },{
//            location: "Polderstraat, Bredene, Belgie",
//            stopover: false
//        },{
//            location: "Bredensesteenweg, Oostende, Belgie",
//            stopover: false
//        },{
//            location: "Maria Hendrikapark, Oostende, Belgie",
//            stopover: false
//        },{
//            location: "Zinnialaan, Oostende, Belgie",
//            stopover: false
//        },{
//            location: "Leopold II-laan, Oostende, België",
//            stopover: false
//        }]
//    };

// Start -> Fort Napoleon
//    var route = {
//        start: 'Monacoplein 2, Oostende, Belgie',
//        end: 'Fort Napoleon, Oostende, België',
//        waypoints: [{
//            location: "Wittenonnenstraat, Oostende, Belgie",
//            stopover: false
//        },{
//            location: "Sint-Franciscusstraat, Oostende, Belgie",
//            stopover: false
//        }]
//    };


//            var infowindow = new google.maps.InfoWindow({
//                map: map,
//                position: pos,
//                content: 'Location found using HTML5.'
//            });