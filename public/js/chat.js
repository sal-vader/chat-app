let socket = io();

function scrollToBottom () {
    // Selectors
    let messages = $('#messages');
    let newMessage = $('li:last-child');
    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

function toggleNavbarMenu () {
    let navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarMenu.style.height === '75vh') {
        navbarMenu.style.height = '0vh'
    }
    else {
        navbarMenu.style.height = '75vh';
    }
}

socket.on('connect', function () {
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        }
        else {
            $('#navbar-menu-title').text(params.chatRoom);
            $('#sidebar-title').text(params.chatRoom);
        }
    });
});

socket.on('updateUserList', function (users) {
    let ol = $('<ol></ol>');
    let olNavbar = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
        olNavbar.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
    $('#navbar-users').html(olNavbar);
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
    scrollToBottom();
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
    scrollToBottom();
});

$('#message-form').on('submit', function (e) {
    // Prevents the default behavior (i.e. full page refresh on form submit)
    e.preventDefault();
    let messageTextBox = $('#message');
    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function (err) {
        if (err) {
            alert(err);
        }
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