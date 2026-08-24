/**
 * Borrowing Power Calculator Test Suite
 */


import assert from 'node:assert/strict';
import { calculateBorrowingPower } from '../src/borrowingCalculator.js';

describe('Term Deposit Calculator Tests', () => {

  it('should calculate borrowing power for standard values', () => {
    const result = calculateBorrowingPower(120000, 2, 3000, 10000, 7.5);
    assert.ok(result.maxLoanAmount > 0, 'Should yield a positive borrowing power amount');
    assert.strictEqual(result.monthlyRepayment, 4200);
  });

  it('should return 0 for invalid negative inputs', () => {
    const result = calculateBorrowingPower(30000, 3, 4000, 5000, 7.5);
    assert.strictEqual(result.maxLoanAmount, 0);
    assert.strictEqual(result.monthlyRepayment, 0);
  });

});

