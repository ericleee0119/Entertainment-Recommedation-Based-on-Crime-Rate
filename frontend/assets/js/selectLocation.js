var checkout = {};

$(document).ready(function() {
	var id1 = "";
	var id2 = "";
	var id3 = "";
	var lat1 = "";
	var lat2 = "";
	var lat3 = "";
	var lon1 = "";
	var lon2 = "";
	var lon3 = "";
	var add = "";
	function callResponse(message) {
    // params, body, additionalParams
    return sdk.sendlocationPost({}, {
      messages: [{
        type: 'unstructured',
        unstructured: {
          text: message
        }
      }]
    }, {});
  }
	function parseCookie() {
		var cookieObj = {};
		var cookieAry = document.cookie.split(';');
		var cookie;
		
		for (var i=0, l=cookieAry.length; i<l; ++i) {
			cookie = jQuery.trim(cookieAry[i]);
			cookie = cookie.split('=');
			cookieObj[cookie[0]] = cookie[1];
		}
		
		return cookieObj;
	}	


	function getCookieByName(name) {
		var value = parseCookie()[name];
		if (value) {
			value = decodeURIComponent(value);
		}

		return value;
	}

	$(window).load(function() {
		
		var msg = getCookieByName('userZip');
		callResponse(msg)
		.then((response) => {
        console.log("response: ", response);
        var data = response.data;
        console.log("LOG: data: ", data)
		//var data = res.body;
        if (data.body && data.body.length > 0) {
          console.log('received ' + data.body.length + ' messages');
		  
          var messages = data.body;
		  console.log('LOG: messages: ', messages);
          for (var message of messages) {
            if (message.type === 'unstructured') {
			  console.log('LOG: message: ', message);
			  var output = message.unstructured.messages;
			  console.log('LOG: output: ', output);
			  for(let i = 0;i<output.length;i++)
			  {
				  console.log('LOG: output[i]: ', output[i]);
				  var val = output[i];
				  if(i == 0)
				  {
					  console.log('LOG: val1: ', val[1]);
					  console.log('LOG: val2: ', val[2]);
					  console.log('LOG: val3: ', val[3]);
					  console.log('LOG: val4: ', val[4]);
					  console.log('LOG: val5: ', val[5]);
					  id1 = val[0];
					  lat1 = val[4];
					  lon1 = val[5];
					  document.getElementById('title1').innerHTML = val[1];
					  document.getElementById('text11').innerHTML = val[2];
					  document.getElementById('text12').innerHTML = val[3];
					  //document.getElementById('text13').innerHTML = message[i][4];
				  }
				  else if(i == 1)
				  {
					  id2 = val[0];
					  lat2 = val[4];
					  lon2 = val[5];
					  document.getElementById('title2').innerHTML = val[1];
					  document.getElementById('text21').innerHTML = val[2];
					  document.getElementById('text22').innerHTML = val[3];
				  }
				  else if(i == 2)
				  {
					  id3 = val[0];
					  lat3 = val[4];
					  lon3 = val[5];
					  document.getElementById('title3').innerHTML = val[1];
					  document.getElementById('text31').innerHTML = val[2];
					  document.getElementById('text32').innerHTML = val[3];
				  }
			  }
			  
            } else if (message.type === 'structured' && message.structured.type === 'product') {
              var html = '';

            } else {
              console.log('not implemented');
            }
          }
        } /*else {
			alert("In this area, we do not have any data, please select again");
			location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/chat.html";
          //console.log('an error occurred from getting message, the message we get is empty', error);
        }*/
		
		
      })
  });


	document.getElementById("action1").onclick = function() {
		console.log('click button');
	
		console.log('LOG: lat1: ', lat1);
		console.log('LOG: lon1: ', lon1);
		
		//document.cookie = "lat=" + lat1 + "; max-age=2592000; path=/" + " ;"+ "lon=" + lon1 + "; " + "max-age=2592000; path=/";
		document.cookie = "destination=" + id1 + ";secure=false";
		localStorage.setItem('lat', lat1);
		localStorage.setItem('lon', lon1);
		console.log('click button');
		window.location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/map.html";
		/*var zip=document.cookie.split(";")[0].split("=")[1]; 
		console.log(document.cookie);
		console.log("Account ID " + zip);*/
	}
  
   document.getElementById("action2").onclick = function() {
		if (document.getElementById('title2').innerHTML == "")
		{
			return false;
		}
		console.log('click button');
		document.cookie = "destination=" + id2 + ";secure=false";
		localStorage.setItem('lat', lat2);
		localStorage.setItem('lon', lon2);
		window.location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/map.html";
		//getGeoLocation();
	}
	
	document.getElementById("phone").onclick = function() {
    insertMessage();
  }
	
	document.getElementById("action3").onclick = function() {
		if (document.getElementById('title3').innerHTML == "")
		{
			return false;
		}
		console.log('click button');
		document.cookie = "destination=" + id3 + ";secure=false";
		localStorage.setItem('lat', lat3);
		localStorage.setItem('lon', lon3);
		window.location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/map.html";
		//getGeoLocation();
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
        });
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
			console.log("received message: ", messages);
          for (var message of messages) {
            if (message.type === 'unstructured') {
              //
			  if(message.unstructured.text == "test")
			  {
				  return false;
			  }
			  //console.log("LOG: condition: ", message.unstructured.text);
			  if(message.unstructured.text != "Successfully")
			  {
				  alert("Please go to your profile to set up your friend's phone number");
				  return false;
			  }
			  insertResponseMessage(message.unstructured.text);
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
	  console.log("button on click");
	  location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/profile.html";
  }
  
  document.getElementById("refresh").onclick = function() {
	  console.log("button on click refresh");
	  location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/selectLocation.html";
  }
  
  document.getElementById("back").onclick = function() {
	  console.log("button on click back");
	  location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/chat.html";
  }
  
  function callResponseMsg(message) {
    // params, body, additionalParams
    console.log("callResponse");
    return sdk.callfriendPost({}, {
      messages: [{
        type: 'unstructured',
        unstructured: {
          text: message
        }
      }]
    }, {});
  }


});
