
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
window.onload = myLoad;

/*var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
});*/



function myLoad()
{ 
	lat = localStorage.getItem('lat');
	lon = localStorage.getItem('lon');
	
	console.log("LOG: lat1: ", lat);
	console.log("LOG: lat2: ", lon);

	var cur_lat = 0;
    var cur_long = 0;
	
	if(navigator.geolocation) {
		console.log("LOG: in navigator");
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log("position lat: ", position.coords.latitude);
			console.log("position lon: ", position.coords.longitude);
			cur_lat = position.coords.latitude;
			cur_long = position.coords.longitude;
			console.log("position cur lat: ", cur_lat);
			console.log("position cur lon: ", cur_long);
			
			var myLatLng = new google.maps.LatLng(cur_lat, cur_long);
			console.log("LOG: cur_lat: ", cur_lat);
			console.log("LOG: cur_lon: ", cur_long);
			var myOptions = {
				zoom: 15,
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById('map'), myOptions);
			directionsDisplay.setMap(map);
			console.log("LOG: lat: ", lat);
			console.log("LOG: lon: ", lon);
			var desLatLng = new google.maps.LatLng(lat, lon);
			
			var request = {
			origin: desLatLng,
			destination: myLatLng,
			travelMode: 'WALKING'
			};
			directionsService.route(request, function (result, status) {
				console.log("result: ", result)
			if (status == 'OK') {
				console.log(result.routes[0].legs[0].steps);
				directionsDisplay.setDirections(result);
				//myLoad()
			} else {
				console.log(status);
			}
		});

	});
	//autoupdate();
}

function autoupdate() {
	console.log("autopilot");
  navigator.geolocation.getCurrentPosition(function(position) {
		
		cur_lat = position.coords.latitude;
		cur_long = position.coords.longitude;
		console.log("position cur lat: ", cur_lat);
		console.log("position cur lon: ", cur_long);
			
		var myLatLng = new google.maps.LatLng(cur_lat, cur_long);
		console.log("LOG: cur_lat: ", cur_lat);
		console.log("LOG: cur_lon: ", cur_long);
		var myOptions = {
			zoom: 15,
			center: myLatLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map'), myOptions);
		directionsDisplay.setMap(map);
		console.log("LOG: lat: ", lat);
		console.log("LOG: lon: ", lon);
		var desLatLng = new google.maps.LatLng(lat, lon);
			
		var request = {
			origin: desLatLng,
			destination: myLatLng,
			travelMode: 'WALKING'
		};
		directionsService.route(request, function (result, status) {
			console.log("result: ", result)
		if (status == 'OK') {
			console.log(result.routes[0].legs[0].steps);
			directionsDisplay.setDirections(result);
			//myLoad()
		} else {
			console.log(status);
		}
	});

	}); 

  // Call the autoUpdate() function every 5 seconds
  setTimeout(autoupdate, 5000);
}
//autoupdate();

var add = "";
document.getElementById("phone").onclick = function() {
    insertMessage();
  }
  
document.getElementById("navigate").onclick = function() {
    autoupdate();
  }
 
function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            document.getElementById("address").value = "Geolocation is not supported by this browser.";
        }
    }

function showPosition(position) {
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;
		console.log("lat: ", lat);
		console.log("lon: ", lang);
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lang + "&sensor=true" + "&key=AIzaSyBcVQ6uqk31vbhcIUbEwR2j2XlMj6FGqgY";
		console.log("url: ", url)
        $.getJSON(url, function (data) {
		console.log("Data: ", data)
        var address = data.results[0].formatted_address;
		
        //cument.getElementById("address").value = address;
		console.log("User Address: ", address)
		add = address;
		console.log("Add: ", add)
        });
    }
function callResponseMsg(message) {
    // params, body, additionalParams
    console.log("callResponse")
    return sdk.callfriendPost({}, {
      messages: [{
        type: 'unstructured',
        unstructured: {
          text: message
        }
      }]
    }, {});
  }
function insertMessage() {
	console.log("insert");
	getGeoLocation();
	console.log("Add: ", add)
	var send_msg = add + "/";
	console.log("msg: ", send_msg)
    if ($.trim(send_msg ) == '') {
      return false;
    }
    callResponseMsg(send_msg )
      .then((response) => {
        console.log(response);
        var data = response.data;

        if (data.messages && data.messages.length > 0) {
          console.log('received ' + data.messages.length + ' messages');

          var messages = data.messages;

          for (var message of messages) {
            if (message.type === 'unstructured') {
              insertResponseMessage(message.unstructured.text);
			  if(message.unstructured.text != "Successfully")
			  {
				  alert("Please go to your profile to set up your friend's phone number");
				  return false;
			  }
            } else if (message.type === 'structured' && message.structured.type === 'product') {
              var html = '';

              insertResponseMessage(message.structured.text);
			  

            } else {
              console.log('not implemented');
            }
          }
        }
      })
      .catch((error) => {
        console.log('an error occurred', error);
        insertResponseMessage('2 Oops, something went wrong. Please try again.');
      });
  }
  function insertResponseMessage(content) {
    //$('<div class="message loading new"><figure class="avatar"><img src="https://media.tenor.com/images/4c347ea7198af12fd0a66790515f958f/tenor.gif" /></figure><span></span></div>').appendTo($('.mCSB_container'));
	alert(content);
  }
  
  document.getElementById("button1").onclick = function() {
	  console.log("button on click profile");
	  location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/profile.html";
  }
  
  document.getElementById("back").onclick = function() {
	  console.log("button on click back");
	  location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/selectLocation.html";
  }

}
