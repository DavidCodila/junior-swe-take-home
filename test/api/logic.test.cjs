const assert = require('node:assert/strict');
const logic = require('../../src/api/logic.js');

describe('API logic apiCall tests', () => {
  const invalidUrl = "http://localhost:3000/api/taxInvalid";
  const expectedInvalid = Error("API call error: Not Found");
  const expectedValid = {
  income: 1000,
  tax: 0,
}
  const validUrl = "http://localhost:3000/api/tax?income=1000";

  it('should return valid response', () => logic.apiCall(validUrl)
  .then((result) => {
    assert.deepStrictEqual(result, expectedValid);
  }))

  it('should return invalid response', async () => {
      try {
          await logic.apiCall(invalidUrl);
      } catch (error) {
          assert.deepStrictEqual(error, expectedInvalid)
      }
    })
})