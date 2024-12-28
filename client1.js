import io from 'socket.io-client';

const socket = io('http://localhost:3000'); 

socket.on('connect', () => {

  socket.emit('chatmessage', 'Hello Server!');

  socket.on('message', (msg) => {
    console.log(`${msg}`);
  });



});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});
