var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(              express.static('public'));
app.use('/jquery',    express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/popper.js', express.static(__dirname + '/node_modules/popper.js/dist/'));
// app.use('/chart.js',  express.static(__dirname + '/node_modules/chart.js/dist/'));
// app.use('/anime.js',  express.static(__dirname + '/node_modules/animejs/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('console', function(cmd) {
    io.emit('cmd', cmd);
    console.log(cmd);
  });

  socket.on('tm4c', function(res) {
    io.emit('response', res);
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
