const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newUser', {
        text: 'Welcome to the chatroom',
        from: 'Admin',
        created: new Date()
    });

    socket.broadcast.emit('newUser', {
        text: 'A new user has joined',
        from: 'Admin',
        created: new Date()
    })

    socket.on('createMessage', (message) => {
        io.emit('newMessage', {
            text: message.text,
            from: message.from,
            created: new Date()
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

