const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('../../utils/message');

describe('generateMessage', () => {
    it('should generate correct message object using arguments', () => {
        let text = 'this is a message';
        let from = 'testUser';
        let generatedMessage = generateMessage(from, text);

        // expect(generatedMessage.text).toBe(text);
        // expect(generatedMessage.from).toBe(from);
        expect(generatedMessage).toMatchObject({from, text});
        expect(typeof generatedMessage.createdDate).toBe('number');
    });
}); 

describe('generateLocationMessage', () => {
    it('should generate a location object', () => {
        let from = 'testUser';
        let latitude = 32.12414532;
        let longitude = 145.1245352;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let generatedLocationMessage = generateLocationMessage(from, latitude, longitude);

        expect(generatedLocationMessage).toMatchObject({from, url});
        expect(typeof generatedLocationMessage.createdDate).toBe('number');
    });
});