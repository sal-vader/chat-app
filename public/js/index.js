let socket = io();

socket.on('newChatRooms', function (chatRooms) {
    var chatRoomsInput = document.getElementById('chat-rooms');
    
    new Awesomplete(chatRoomsInput, {
        minChars: 1,
        list: chatRooms
    });
});