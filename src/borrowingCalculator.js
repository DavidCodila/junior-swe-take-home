import { INTEREST_RATE } from './constants.js';
import { getHEM, getTax } from './api/calls.js';

const LOAN_TERM_IN_MONTHS = 360; // 30 Years
const ASSESSMENT_RATE_BUFFER = 3.0; // 3.0% buffer added to interest rates
const CARD_LIABILITY_FACTOR = 0.03; // ~3%
const MONTHS_PER_YEAR = 12;

/**
 * Calculates the total borrowing power amount and the monthly repayment configuration
 */
export async function calculateBorrowingPower(user) {
    return new Promise((resolve) => {
        // 1. Calculate Net Monthly Income after tax deductions
        getTax(user.income)
        .then(annualTax => {
            const netMonthlyIncome = (user.income - annualTax) / MONTHS_PER_YEAR;
            
            // 2. Determine living expenses (User declared expenses vs HEM baseline, whichever is higher)
            getHEM(user.income, user.dependents)
            .then(baselineHEM => {
                const totalLivingExpenses = Math.max(user.expenses, baselineHEM);

                // 3. Calculate credit card liability (~3% of total limits)
                const creditCardLiability = user.creditLimits * CARD_LIABILITY_FACTOR;

                // 4. Calculate monthly repayment capacity
                const maxMonthlyRepayment = netMonthlyIncome - totalLivingExpenses - creditCardLiability;

                // Return early if user cannot afford a loan at all
                if (maxMonthlyRepayment <= 0) {
                    resolve({ maxLoanAmount: 0, monthlyRepayment: 0 });
                }

                // Banks assess loans using base rate + buffer for safety
                const assessmentRate = INTEREST_RATE + ASSESSMENT_RATE_BUFFER;

                // 5. Calculate the monthly interest rate
                const monthlyRate = (assessmentRate / 100) / MONTHS_PER_YEAR;

                // 6. Calculate maximum borrowing power using the following formula:
                // P = M * (1 - (1 + R)^-N) / R
                const maxLoanAmount = maxMonthlyRepayment * ((1 - Math.pow(1 + monthlyRate, - LOAN_TERM_IN_MONTHS)) / monthlyRate);

                resolve({
                    maxLoanAmount: Number(maxLoanAmount.toFixed(2)),
                    monthlyRepayment: Number(maxMonthlyRepayment.toFixed(2))
                })
            })
        });
    })
}