
var markerTo,map,route;
function initMap() {

    route = new google.maps.DirectionsRenderer;

    var mapDiv = document.getElementById('googleMap');
    map = new google.maps.Map(mapDiv, {
        zoom: 11,
        center:	new	google.maps.LatLng(50.464379,30.519131)
    });

    var point	=	new	google.maps.LatLng(50.464379,30.519131);
    var marker	=	new	google.maps.Marker({
        position:point,
        map:map,
        icon:	"assets/images/map-icon.png"
    });

    route.setOptions({suppress:true});
    route.setMap(map);


    google.maps.event.addListener(map,'click',function(me){
            var coordinates	=	me.latLng;
            geocodeLatLng(coordinates,	function(err,	adress){
                if(!err)	{
                   //Дізналися адресу
                    console.log(adress);
                }	else	{
                    console.log("Немає адреси")
                }
            })
            calculateRoute(point,coordinates,function (err, adressTo) {
                var durationTo = adressTo.duration;
                console.log(durationTo);
                $('#durationTo').text(durationTo.text);
            })
        });


        $("#next-btn").click(function() {


            if($('.has-error').length == 0) {

                var req = $('form').serialize() + "&cart=" + encodeURI(localStorage['pizzaCartData'])
                $.post("/api/create-order/", req, function(res) {
                    if(res.success) {

                        LiqPayCheckout.init({
                            data: res.data,
                            signature: res.signature,
                            embedTo: "#liqpay",
                            mode: "popup" //  embed ||  popup
                        }).on("liqpay.callback",  function(data){
                            console.log(data.status);
                            console.log(data);
                        }).on("liqpay.ready", function(data){
                            //  ready
                        }).on("liqpay.close", function(data){
                            //  close
                        });
                    } else {
                        alert("Failed to create order")
                    }
                })
            }
        })


}

function	geocodeLatLng(latlng,	 callback){
//Модуль за роботу з адресою
    var geocoder	=	new	google.maps.Geocoder();
    geocoder.geocode({'location':	latlng},	function(results,	status)	{
        if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
            var adress =	results[1].formatted_address;
            callback(null,	adress);
        }	else	{
            callback(new	Error("Can't	find	adress"));
        }
    });


}

function	geocodeAddress(adress,	 callback)	{
    var geocoder	=	new	google.maps.Geocoder();
    geocoder.geocode({'address':	address},	function(results,	status)	{
        if	(status	===	google.maps.GeocoderStatus.OK&&	results[0])	{
            var coordinates	=	results[0].geometry.location;
            //////////////////////////
            callback(null,	coordinates);

        }	else	{
            callback(new	Error("Can	not	find	the	adress"));
        }
    });
}

function	calculateRoute(A_latlng,	 B_latlng,	callback)	{
    var directionService =	new	google.maps.DirectionsService();
    directionService.route({
        origin:	A_latlng,
        destination:	B_latlng,
        travelMode:	google.maps.TravelMode["DRIVING"]
    },	function(response,	status)	{
        if	(	status	==	google.maps.DirectionsStatus.OK )	{
           var leg	=	response.routes[0].legs[0];
            $('#inputAdress').val(leg.end_address);
            $('#addressTo').text(leg.end_address);
            if(markerTo)
                markerTo.setMap(null);
            markerTo = new google.maps.Marker({
                position:B_latlng,
                map: map,
                icon: "/assets/images/home-icon.png"
            });
            route.setDirections(response);
            callback(null,	{
                duration:	leg.duration
            });

        }	else	{
            callback(new	Error("Can'	not	find	direction"));
        }
    });
}



// google.maps.event.addDomListener(window,'load',initialize);
