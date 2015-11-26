$(function(){
  var HTML5WebSockets = {};
  HTML5WebSockets.socketio = {
    yoursocket : null,
    initialize : function() {
      HTML5WebSockets.socketio.yoursocket = io.connect('http://mywebd.imwork.net:22222/');
      HTML5WebSockets.socketio.yoursocket.on('connect', function() {
          HTML5WebSockets.socketio.log('You are connected to Server<br />');
      });
      HTML5WebSockets.socketio.yoursocket.on('YourMessageResponse', function(data) {
          HTML5WebSockets.socketio.log('Server Custom Response: ' + data + '<br />');
      });
      HTML5WebSockets.socketio.yoursocket.on('disconnect', function() {
          HTML5WebSockets.socketio.log('You are disconnected from Server<br />');
      });
    },
    emitCustomMessageToServer : function(data) {
      HTML5WebSockets.socketio.yoursocket.emit("YourcustomMessage", data);
      HTML5WebSockets.socketio.log("Custom message to Server: " + data + "<br />");
    },
    log : function(message) {
      document.querySelector('#log').innerHTML += message;
    }
  };

  $("#sendCustMes").click(function() {
    HTML5WebSockets.socketio.emitCustomMessageToServer($("#custMes").val());
    $("#custMes").val("");
  });

  HTML5WebSockets.socketio.initialize();
});