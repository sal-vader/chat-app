let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdDate).format('h:mm:ss A');
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdDate: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdDate).format('h:mm:ss A');
    let template = $('#message-location-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdDate: formattedTime
    });
    $('#messages').append(html);
});

$('#message-form').on('submit', function (e) {
    // Prevents the default behavior (i.e. full page refresh on form submit)
    e.preventDefault();
    let messageTextBox = $('#message');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

let locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function () {
        alert('Unable to find your current location');
        locationButton.removeAttr('disabled').text('Send location');
    })
})