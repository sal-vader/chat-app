const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.emit('newChatRooms', users.getChatRooms());

    socket.on('join', (params, cb) => {
        if (!isRealString(params.username) || !isRealString(params.chatRoom)) {
            return cb('Username and Room Name are required');
        }
        else if (users.getUserByUsername(params.username)) {
            return cb('Username is already in use');
        }
        else if (params.username.length > 20 || params.chatRoom.length > 20) {
            return cb('Username and Chat Room are limited to 20 characters each')
        }

        socket.join(params.chatRoom);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.username, params.chatRoom);

        io.to(params.chatRoom).emit('updateUserList', users.getUserList(params.chatRoom));

        // socket.emit sends event only to original requestor
        socket.emit('newMessage', generateMessage('Admin', `Welcome to chatroom: ${params.chatRoom}`));

        // socket.broadcast.emit sends event to all, except original requestor
        socket.broadcast.to(params.chatRoom).emit('newMessage', generateMessage('Admin', `${params.username} has joined the chat room`));
        cb();
    })

    socket.on('createMessage', (message, cb) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            // io.emit sends event to all
            io.to(user.chatRoom).emit('newMessage', generateMessage(user.username, message.text));
        }
        cb();
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if (user) {
            io.to(user.chatRoom).emit('newLocationMessage', generateLocationMessage(user.username, coords.latitude, coords.longitude));
        }
    });
 
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.chatRoom).emit('updateUserList', users.getUserList(user.chatRoom));
            io.to(user.chatRoom).emit('newMessage', generateMessage('Admin', `${user.username} has left`));
        }
    });
});


server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

