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

socket.on('newLocationMessage', function (message) {
    let li = $('<li></li>');
    let a = $('<a target="_blank">My current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
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

let locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to find your current location');
    })
})