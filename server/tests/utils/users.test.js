const expect = require('expect');

const {Users} = require('../../utils/users');

describe('Users', () => {
    let users = [];

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            username: 'test1',
            chatRoom: 'Node Course'
        }, {
            id: '2',
            username: 'test2',
            chatRoom: 'React Course'
        }, {
            id: '3',
            username: 'test3',
            chatRoom: 'Node Course'
        }];
    });

    it('should add new user', () => {
        let users = new Users()
        var user = {
            id: '123',
            username: 'testUser',
            chatRoom: 'Test Room'
        };
        let resUser = users.addUser(user.id, user.username, user.chatRoom);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let user = users.removeUser('1');

        expect(users.users.length).toBe(2);
    });

    it('should not remove invalid user', () => {
        let user = users.removeUser('5');
        
        expect(typeof user).toBe('undefined');
        expect(users.users.length).toBe(3);
    });

    it('should get a user', () => {
        let user = users.getUser('1');
        
        expect(user).toEqual(users.users[0]);
    });

    it('should not get a user', () => {
        let user = users.getUser('5');
        
        expect(typeof user).toBe('undefined');
    });

    it('should return name for Node Course', () => {
        let userList = users.getUserList('Node Course');
        
        expect(userList).toEqual(['test1', 'test3']);
    });

    it('should return name for React Course', () => {
        let userList = users.getUserList('React Course');
        
        expect(userList).toEqual(['test2']);
    });
});