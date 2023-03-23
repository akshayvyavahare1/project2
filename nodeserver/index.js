const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
let socket = io();


app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//node server witch will handle socket io connection
const io = require('socket.io')(server, { 'origins': ':', 'pingTimeout': 20000, 'pingInterval': 25000 });

const users = {};


// io.on is  use for listan user. sk.on handle scoket function
// io.on('connection', socket => {
//   console.log("socket connect")
  io.on("connection", function(socket){
    socket.to("some room").emit("some event");
  });
  // io.to(socket.id).emit('res', {name:'deep'});
  // for new user jioned event
  socket.on('new-user-joined', name => {

    users[socket.id] = name;
    io.emit('res', { name: name });
    console.log("new user", name)
  });

  // for send msg
  socket.on('send', message => {

    socket.broadcast.emit('receive', { message: message, name: users[socket.id] })

  });

// left chat disconnection
  socket.on('disconnect', message => {

    socket.broadcast.emit('left', users[socket.id]);
    users[socket.id] = message;
    delete users[socket.id];
   
    

   
  });

})

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// socket.on is event