var HTML5WebSockets = {};
HTML5WebSockets.socketio = {
  yoursocket : null,
  initialize : function() {
      HTML5WebSockets.socketio.yoursocket = io.connect('http://mywebd.imwork.net:22222/');
      HTML5WebSockets.socketio.yoursocket.on('connect', function() {
          HTML5WebSockets.socketio.log('You are connected to Server<br />');
      });
      HTML5WebSockets.socketio.yoursocket.on('message', function(data) {
          HTML5WebSockets.socketio.log('Server Response:  ' + data + '<br />');
      });
      HTML5WebSockets.socketio.yoursocket.on('disconnect', function() {
          HTML5WebSockets.socketio.log('You are disconnected from Server<br />');
      });
      document.querySelector('#sendMes').onclick = function() {
          HTML5WebSockets.socketio.sendMessageToServer(document.querySelector('#mes').value);
          document.querySelector('#mes').value = '';
      };
      document.querySelector('#sendCustMes').onclick = function() {
            HTML5WebSockets.socketio.emitCustomMessageToServer(document.querySelector('#custMes').value);
            document.querySelector('#custMes').value = '';
      };
  },
  sendMessageToServer : function(data) {
      HTML5WebSockets.socketio.yoursocket.send(data);
      HTML5WebSockets.socketio.log('Message to Server: ' + data + '<br />');
  },
  emitCustomMessageToServer : function(data) {
        HTML5WebSockets.socketio.yoursocket.emit('YourcustomMessage', data);
        HTML5WebSockets.socketio.log('Custom message to Server: ' + data + '<br />');
    },
  log : function(message) {
      document.querySelector('#log').innerHTML += message;
  }
};

document.onkeydown=function(event){
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if(e && e.keyCode==13){
    HTML5WebSockets.socketio.sendMessageToServer(document.querySelector('#mes').value);
    document.querySelector('#mes').value = '';
  }
}; 
HTML5WebSockets.socketio.initialize();