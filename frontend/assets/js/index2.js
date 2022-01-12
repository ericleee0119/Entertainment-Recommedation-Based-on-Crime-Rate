var checkout = {};

$(document).ready(function() {


  function callResponse(message) {
    // params, body, additionalParams
    return sdk.createPost({}, {
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
	password_again_msg = document.getElementById("password_again_text").value
	
	if(account_msg == "")
	{
		alert("Account cannot be empty");
		return false;
	}
	
	if(password_msg == "")
	{
		alert("Password cannot be empty");
		return false;
	}
	
	if(password_again_msg == "")
	{
		alert("Verified password cannot be empty");
		return false;
	}
	
	if(password_msg != password_again_msg)
	{
		alert("Please enter the same password");
		return false;
	}
	
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
			  window.location.href = "http://finalprojects3bucket002.s3-website-us-west-2.amazonaws.com/index.html";
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

  document.getElementById("submitAccount").onclick = function() {
    insertMessage();
  }

  function insertResponseMessage(content) {
    //$('<div class="message loading new"><figure class="avatar"><img src="https://media.tenor.com/images/4c347ea7198af12fd0a66790515f958f/tenor.gif" /></figure><span></span></div>').appendTo($('.mCSB_container'));
	alert(content);
  }

});
