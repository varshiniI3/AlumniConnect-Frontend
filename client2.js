const io = require('socket.io-client');

const socket = io('http://localhost:3000'); 

socket.on('connect', () => {

  socket.emit('chatmessage', 'Message from Client 2');

  socket.on('message', (msg) => {
    console.log(`${msg}`);
  });

});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});
