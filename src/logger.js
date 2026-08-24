import { INTEREST_RATE } from './constants.js';

export class Logger {

    static intro() {
        console.log("Mortgage Borrowing Power Calculator");
        console.log("===================================");
    }

    static summary(loanResult) {
        console.log("\n--- Calculation Summary ---");
        console.log(`Maximum Borrowing Power at ${INTEREST_RATE}%: $${loanResult.maxLoanAmount.toLocaleString()}`);
        console.log(`Assumed Monthly Mortgage Repayment: $${loanResult.monthlyRepayment.toLocaleString()} over 30 years`);
    }

}
