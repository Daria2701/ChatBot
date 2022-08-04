var socket = new WebSocket('ws://localhost:8181/', 'chat');

socket.onopen = function () {
    socket.send('{"type": "join", "name":"Human"}');
}


var date = new Date();
var options = {
    hour: 'numeric',
    minute: 'numeric',
   
  };

  var avatar = '<div class = avatar_human><img src="/resources/1.png"></div>'

  $('#send').on('click', function (e) {
    e.preventDefault();
    msg = $('#msg').val();
    request = $('<div class="chat-window">' + '<div class="chat-window-mini msg-self">' +  msg  + '<br>' + '<div class = "time">' + date.toLocaleString("de", options) + '</div>'  + '</div>' + avatar + '</div>');
    socket.send('{"type": "msg", "msg": "' + msg + '"}');
    $('#msg').val('');
});

var avatar_bot= '<div class = avatar_bot><img src="/resources/2.png" ></div> '
var date2 = new Date();
var options = {
    hour: 'numeric',
    minute: 'numeric',
   
  };
socket.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    switch (data.type) {
        case 'msg':
            respond = $('<div class="chat-window">' + avatar_bot +'<div class="chat-window-mini msg-bot">' + data.msg + '<br>' + '<div class = "time">' + date2.toLocaleString("de", options) +  '</div>'  + '</div>' + '</div>' );
            if (data.name === "Kasper") {
                $('#messages').append(respond);
            } else {
                $('#messages').append(request);
            }
            
            const element = document.getElementById('messageBody');
            element.scrollTop = element.scrollHeight;
                
        case 'join':
            $('#users').empty();
            for (var i = 0; i < data.names.length; i++) {
                var user = $('<div>' + data.names[i] + '</div>');
                $('#users').append(user);
            }
            break;
    }
};

function stateChange() {
    var obj = document.getElementById('2');
  
    obj.style.display = 
        (obj.style.display == "none" ?
        "block" : "none");
  }

  $('#1').click(function() {
    $("#1").css("display", "none");
  });  




