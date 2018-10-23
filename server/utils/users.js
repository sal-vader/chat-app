[{
    id: 'asdfasdf'
}]

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, username, chatRoom) {
        let user = {id, username, chatRoom};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        let user = this.users.filter((user) => user.id === id)[0];
        
        if (user) {
            this.users.splice(this.users.indexOf(user), 1);
        }
        
        return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserByUsername (username) {
        return this.users.filter((user) => user.username === username)[0];
    }

    getUserList (chatRoom) {
        let users = this.users.filter((user) => user.chatRoom === chatRoom)
        let namesArr = users.map((user) => user.username);
        return namesArr;
    }

    getChatRooms () {
        let chatRooms = this.users.map((user) => user.chatRoom);
        if (chatRooms.length > 0) {
            return chatRooms.filter((value, index, arr) => arr.indexOf(value) === index);
        }
        return ['New Chat Room'];
    }
}

module.exports = {Users};