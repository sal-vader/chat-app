const expect = require('expect');

const {isRealString} = require('../../utils/validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let result = isRealString(true);
        expect(result).toBe(false);
    });
    it('should reject string with only spaces', () => {
        let result = isRealString('                 ');
        expect(result).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        let result = isRealString(' this is valid   ');
        expect(result).toBe(true);
    });
});