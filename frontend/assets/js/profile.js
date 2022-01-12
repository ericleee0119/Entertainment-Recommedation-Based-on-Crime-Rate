var checkout = {};

$(document).ready(function() {


  function callResponse(message) {
    // params, body, additionalParams
    console.log("callResponse")
    return sdk.profilePost({}, {
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
  user_msg = document.getElementById("user_name").value
  friend_msg = document.getElementById("friend_name").value
  phone_msg = document.getElementById("phone_num").value

  //document.cookie = "userAccount=" + user_msg + ";secure=false";
  console.log(friend_msg);

  if(friend_msg == "")
  {
    alert("Friend's name cannot be empty.");
    return false;
  }
  
  if(phone_msg == "")
  {
    alert("Phone number cannot be empty.");
    return false;
  }

  if(phone_msg.length != 10)
  {
    alert("Invalid phone number. Please enter again.");
    return false;
  }
  
  msg = user_msg + "_" + friend_msg + "_" + phone_msg;
  
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
        window.location.href = "https://finalprojects3bucket002.s3.us-west-2.amazonaws.com/selectLocation.html";
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

  document.getElementById("submitphone").onclick = function() {
    insertMessage();
  }

  function insertResponseMessage(content) {
    //$('<div class="message loading new"><figure class="avatar"><img src="https://media.tenor.com/images/4c347ea7198af12fd0a66790515f958f/tenor.gif" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  alert(content);
  }

});
