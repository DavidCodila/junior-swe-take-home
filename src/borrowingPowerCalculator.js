import { calculateMaxMonthlyRepayment, calculateMaxLoanAmount } from '../src/calculator/mathsHelper.js';

export class BorrowingPowerCalculator {
    loanResult;
    apiProvider;

    constructor() {
        this.loanResult = { maxLoanAmount: 0, monthlyRepayment: 0 };
    }

    async calculateBorrowingPower(user) {
        return new Promise(async (resolve) => {
            const maxMonthlyRepayment = await calculateMaxMonthlyRepayment(user);
            if (maxMonthlyRepayment > 0) {
                this.loanResult.maxLoanAmount = calculateMaxLoanAmount(maxMonthlyRepayment);
                this.loanResult.monthlyRepayment = maxMonthlyRepayment;
            }
    
            resolve(this.loanResult);
        })
    }
}