let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let newMessage = $('<li></li>');
    newMessage.text(`${message.from}: ${message.text}`);
    $('#messages').append(newMessage);
});

$('#message-form').on('submit', function (e) {
    // Prevents the default behavior (i.e. full page refresh on form submit)
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('#message').val()
    }, function () {

    });
});