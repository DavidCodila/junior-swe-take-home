/**
 * Borrowing Power Calculator
 * 
 * Gen's incomplete prototype. 
 * This currently calculates what a user can borrow over 30 years.
 * Currently this code uses placeholder methods for Tax and HEM values. 
 * 
 * TODO: Refactor the code to pull Tax and HEM values from an API call.
 * A server.js has been provided to supply these values.
 */

import { INTEREST_RATE } from './constants.js';
import { getTax } from './api.js';

function getHEM(income, dependents) {
    // REPLACE THIS
    // Write your HEM API call code here.
    return 2000 + (dependents * 400);
}


/**
 * Calculates the total borrowing power amount and the monthly repayment configuration
 */
export async function calculateBorrowingPower(user) {
    return new Promise((resolve) => {
        const loanTermMonths = 360; // 30 Years
        const assessmentRateBuffer = 3.0; // 3.0% buffer added to interest rates
        // 1. Calculate Net Monthly Income after tax deductions
        getTax(user.income)
        .then(annualTax => {
            const netMonthlyIncome = (user.income - annualTax) / 12;
            
            // 2. Determine living expenses (User declared expenses vs HEM baseline, whichever is higher)
            const baselineHEM = getHEM(user.income, user.dependents);
            const totalLivingExpenses = Math.max(user.expenses, baselineHEM);

            // 3. Calculate credit card liability (~3% of total limits)
            const creditCardLiability = user.creditLimits * 0.03;

            // 4. Calculate monthly repayment capacity
            const maxMonthlyRepayment = netMonthlyIncome - totalLivingExpenses - creditCardLiability;

            // Return early if user cannot afford a loan at all
            if (maxMonthlyRepayment <= 0) {
                resolve({ maxLoanAmount: 0, monthlyRepayment: 0 });
            }

            // Banks assess loans using base rate + buffer for safety
            const assessmentRate = INTEREST_RATE + assessmentRateBuffer;

            // 5. Calculate the monthly interest rate
            const monthlyRate = (assessmentRate / 100) / 12;

            // 6. Calculate maximum borrowing power using the following formula:
            // P = M * (1 - (1 + R)^-N) / R
            const maxLoanAmount = maxMonthlyRepayment * ((1 - Math.pow(1 + monthlyRate, - loanTermMonths)) / monthlyRate);

            resolve({
                maxLoanAmount: Number(maxLoanAmount.toFixed(2)),
                monthlyRepayment: Number(maxMonthlyRepayment.toFixed(2))
            })
        });
    })
    
}