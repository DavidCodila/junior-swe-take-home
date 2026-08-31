const assert = require('node:assert/strict');
const calls = require('../../src/api/calls.js')

describe('API getAnnualTax call tests', () => {
    const firstTaxBracket = 20000;
    const firstTaxMultiplier = 0.15;
    const validTaxAmount = 20020;
    const invalidInput = -1;

    // Tax = (income - taxThreshold)*ratioOfTaxPerDollar
    const tax = (validTaxAmount - firstTaxBracket) * firstTaxMultiplier

  it('should return valid response', () => calls.getAnnualTax(validTaxAmount)
  .then((result) => {
    assert.strictEqual(result, tax);
  }))

  it('should return invalid response', async () => {
    try {
        await calls.getAnnualTax(invalidInput);
    } catch (error) {
        assert.deepStrictEqual(error, Error("getAnnualTax API error"))
    }
  })

});

describe('API getHEM call tests', () => {
    const user = {income : 60000, dependents : 0, expenses : 3000, creditLimits : 10000}
    const expectedHem = 1600;

  it('should return valid response', () => calls.getHEM(user)
  .then((result) => {
    assert.strictEqual(result, expectedHem);
  }))

  it('should return invalid response', async () => {
    const invalidUser = user;
    invalidUser.income = -1;
    try {
        await calls.getHEM(user);
    } catch (error) {
        assert.deepStrictEqual(error, Error("getHEM API error"))
    }
  })

});
