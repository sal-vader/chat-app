const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;
const {generateMessage} = require('./utils/message');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit sends event only to original requestor
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatroom'));

    // socket.broadcast.emit sends event to all, except original requestor
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

    socket.on('createMessage', (message) => {
        console.log(message);
        // io.emit sends event to all
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

