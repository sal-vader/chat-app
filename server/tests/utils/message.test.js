const expect = require('expect');

const {generateMessage} = require('../../utils/message');

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