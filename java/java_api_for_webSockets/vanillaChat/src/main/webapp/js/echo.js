"use strict";

//alert("Go!");

var Echo = Echo || {};

Echo.connect = function (host) {
  console.log("connection to: " + host);

  if ('WebSocket' in window) {
    Echo.socket = new WebSocket(host);
  }
  else if ('MozWebSocket' in window) {
    Echo.socket = new MozWebSocket(host);
  }
  else {
    console.error('web socket is not supported by your browser!');
    return;
  }

  Echo.socket.onopen = function () {
    console.log("Info: connection opened");
    $("#chatEditor").keydown(function (evt) {
      if (evt.keyCode == 13) {
        Echo.sendMessage();
      }
    })
  }

  Echo.socket.onmessage = function (message) {
    console.log("message: " + message.data);
    $("#chatLog").append(message.data);
  }

  Echo.socket.onclose = function () {
    console.log("Info: connection has been closed");
  }
}

Echo.sendMessage = function () {
  let msg = $("#chatEditor").val();
  $("#chatEditor").val('');
  if (msg && msg != '') {
    Echo.socket.send(msg);
  }
}

Echo.initialize = function () {
  var ep = '/websocket/echo';
  let url = `${window.location.host}${ep}`;
  if (window.location.protocol == 'http:') {
    url = 'ws://' + url;
  }
  else {
    url = 'wss://' + url;
  }
  Echo.connect(url);
};

Echo.initialize();

