var checkout = {};

$(document).ready(function() {


  function callResponse(message) {
    // params, body, additionalParams
    return sdk.loginPost({}, {
      messages: [{
        type: 'unstructured',
        unstructured: {
          text: message
        }
      }]
    }, {});
  }

  function insertMessage() {
	  
	account_msg = document.getElementById("account_text").value
	password_msg = document.getElementById("password_text").value
	
	msg = account_msg + "_" + password_msg;
	
    //msg = $('.message-input').val();
    if ($.trim(msg) == '') {
      return false;
    }
    //$('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    //setDate();
    //$('.message-input').val(null);
    //updateScrollbar();

    callResponse(msg)
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
				  return false;
			  }
			  document.cookie = "userAccount=" + account_msg + ";secure=false";
			  console.log(document.cookie);
			  console.log('Account ID' + account_msg);
			  
			  if(window.localStorage)
			  {
				  localStorage.name = account_msg;
			  }
			  else
			  {
				  alert("Not supported");
			  }
			  
			  //Cookies('userAccount', account_msg);
			  location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/chat.html";
            } else if (message.type === 'structured' && message.structured.type === 'product') {
              var html = '';

              insertResponseMessage(message.structured.text);
			  

            } else {
              console.log('not implemented');
            }
          }
        } else {
          insertResponseMessage('Oops, something went wrong. Please try again.');
        }
      })
      .catch((error) => {
        console.log('an error occurred', error);
        insertResponseMessage('Oops, something went wrong. Please try again.');
      });
  }

  document.getElementById("loginAccount").onclick = function() {
    insertMessage();
  }

  function insertResponseMessage(content) {
    //$('<div class="message loading new"><figure class="avatar"><img src="https://media.tenor.com/images/4c347ea7198af12fd0a66790515f958f/tenor.gif" /></figure><span></span></div>').appendTo($('.mCSB_container'));
	alert(content);
  }

});
