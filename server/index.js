const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
var Filter = require('bad-words');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }});
app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`, type:'text'});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`, type:'text' });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    filter = new Filter();
    const user = getUser(socket.id);
    if(user.room){
    io.to(user.room).emit('message', { user: user.name, text: filter.clean(message), type:'text'});
    callback();
    }
    else{
      callback('No such user room present');
    }
  });

  socket.on('sendLocation', (location, callback) => {
    const user = getUser(socket.id);
    if(user){
         io.to(user.room).emit('message', { user: user.name, text: location , type:'location'});
         callback();
    }
    else{
      callback('No such user room present');
    }
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` , type:'text'});
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));