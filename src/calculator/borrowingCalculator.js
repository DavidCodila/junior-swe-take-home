import { calculateMaxMonthlyRepayment, calculateMaxLoanAmount } from './mathsHelper.js';

/**
 * Calculates the total borrowing power amount and the monthly repayment configuration
 */
export async function calculateBorrowingPower(user) {
    return new Promise(async (resolve) => {
        const loanResult = initaliseLoanResult();
        const maxMonthlyRepayment = await calculateMaxMonthlyRepayment(user);
        if (maxMonthlyRepayment > 0) {
            loanResult.maxLoanAmount = calculateMaxLoanAmount(maxMonthlyRepayment);
            loanResult.monthlyRepayment = maxMonthlyRepayment;
        }

        resolve(loanResult);
    })
}

function initaliseLoanResult() {
    return { maxLoanAmount: 0, monthlyRepayment: 0 };
}