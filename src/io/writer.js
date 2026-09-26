export class Writer {
    constructor(intrestRate) {
        this.intrestRate = intrestRate;
    }

    intro() {
        console.log("Mortgage Borrowing Power Calculator");
        console.log("===================================");
    }

    summary(loanResult) {
        console.log("\n--- Calculation Summary ---");
        console.log(`Maximum Borrowing Power at ${this.intrestRate}%: $${this.#toFormattedNumber(loanResult.maxLoanAmount).toLocaleString()}`);
        console.log(`Assumed Monthly Mortgage Repayment: $${this.#toFormattedNumber(loanResult.monthlyRepayment).toLocaleString()} over 30 years`);
    }
    
    #toFormattedNumber(value) {
        return Number(value.toFixed(2));
    }
}