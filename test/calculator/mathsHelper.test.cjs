const assert = require('node:assert/strict');
const mathsHelper = require('../../src/calculator/mathsHelper.js');

describe('Maths Helper Tests', () => {
    const user = {income : 120000, dependents : 2, expenses : 3000, creditLimits : 10000};

    it('should calculate max monthly repayment', () => {
        const tax = 1500;
        const hem = 2000;
        const expected = 6575;
        const actual = mathsHelper.calculateMaxMonthlyRepayment(user, tax, hem);
        assert.strictEqual(expected, actual);
    });

    it('should calculate calculate max loanAmount', () => {
        const maxMonthlyRepayment = 555;
        const expected = 63242.70508715785;
        const actual = mathsHelper.calculateMaxLoanAmount(maxMonthlyRepayment);
        assert.strictEqual(expected, actual);
    })
})