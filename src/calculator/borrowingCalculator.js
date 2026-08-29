import { getHEM, getAnnualTax } from '../api/calls.js';
import { calculateMaxMonthlyRepayment, calculateMaxLoanAmount } from './mathsHelper.js';

/**
 * Calculates the total borrowing power amount and the monthly repayment configuration
 */
export async function calculateBorrowingPower(user) {
    return new Promise((resolve) => {
        const loanResult = initaliseLoanResult();
        getAnnualTax(user.income)
        .then(annualTax => {
            getHEM(user)
            .then(hem => {
                const maxMonthlyRepayment = calculateMaxMonthlyRepayment(user, annualTax, hem);
                if (maxMonthlyRepayment > 0) {
                    loanResult.maxLoanAmount = calculateMaxLoanAmount(maxMonthlyRepayment);
                    loanResult.monthlyRepayment = maxMonthlyRepayment;
                }

                resolve(loanResult)
            })
        });
    })
}

function initaliseLoanResult() {
    return { maxLoanAmount: 0, monthlyRepayment: 0 };
}