const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;
let app = express();
let server = http.createServer(app);

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

