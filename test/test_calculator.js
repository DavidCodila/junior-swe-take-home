/**
 * Borrowing Power Calculator Test Suite
 */


import assert from 'node:assert/strict';
import { calculateBorrowingPower } from '../src/borrowingCalculator.js';

describe('Term Deposit Calculator Tests', () => {

  it('should calculate borrowing power for standard values', () => {
    calculateBorrowingPower({income : 120000, dependents : 2, expenses : 3000, creditLimits : 10000})
    .then(result => {
      assert.ok(result.maxLoanAmount > 0, 'Should yield a positive borrowing power amount');
      assert.strictEqual(result.monthlyRepayment, 4700);
    });
  });

  it('should return 0 for invalid negative inputs', () => {
    calculateBorrowingPower({income: 30000, dependents: 3, expenses: 4000, creditLimits: 5000})
    .then(result => {
      assert.strictEqual(result.maxLoanAmount, 0);
      assert.strictEqual(result.monthlyRepayment, 0);
    });
  });

});

