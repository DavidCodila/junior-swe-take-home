const assert = require('node:assert/strict');
const validator = require('../../src/io/validator.js');

describe('Validator Tests', () => {
    it('should pass as Float', () => {
        const actual = validator.isValidFloat(1.1);
        assert(actual);
    })
    it('should not pass as Float', () => {
        const actual = validator.isValidFloat("Float");
        assert(!actual);
    })
    it('should pass as Int', () => {
        const actual = validator.isValidInt(1);
        assert(actual);
    })
    it('should not pass as Int', () => {
        const actual = validator.isValidInt("Int");
        assert(!actual);
    })
})