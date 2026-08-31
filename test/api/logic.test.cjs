const assert = require('node:assert/strict');
const logic = require('../../src/api/logic.js');

describe('API logic apiCall tests', () => {

  it('should return valid response', () => logic.apiCall("incali")
  .then((result) => {
    assert.strictEqual(result, tax);
  }))
})